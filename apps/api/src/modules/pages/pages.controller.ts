import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { PagesService } from './pages.service';

// Temporary storage for preview data (in production, use Redis or similar)
const previewDataStore = new Map<string, { data: any; timestamp: number }>();

@Controller('sites/:siteId/pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(
    @Param('siteId') siteId: string,
    @Body() body: { title: string; slug: string }
  ) {
    return this.pagesService.create(siteId, body.title, body.slug);
  }

  @Get(':slug')
  findOne(@Param('siteId') siteId: string, @Param('slug') slug: string) {
    return this.pagesService.findOne(siteId, slug);
  }

  @Post(':slug/preview')
  async createPreview(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Body() body: { data: any }
  ) {
    const previewId = `${siteId}-${slug}-${Date.now()}`;
    const key = `preview-${previewId}`;

    // Store preview data with timestamp
    previewDataStore.set(key, {
      data: body.data,
      timestamp: Date.now(),
    });

    // Clean up old preview data (older than 1 hour)
    this.cleanupOldPreviewData();

    return { previewId };
  }

  @Get(':slug/preview')
  async preview(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Res() res: Response,
    @Query('previewId') previewId?: string
  ) {
    let pageData: any;
    let pageTitle: string;

    if (previewId) {
      // Use preview data from temporary storage
      const key = `preview-${previewId}`;
      const previewData = previewDataStore.get(key);

      if (previewData) {
        pageData = previewData.data;
        pageTitle = pageData.root?.title || 'Preview';

        // Clean up after use
        previewDataStore.delete(key);
      } else {
        return res.status(404).send('Preview not found or expired');
      }
    } else {
      // Use saved page data
      const page = await this.pagesService.findOne(siteId, slug);
      if (!page) {
        return res.status(404).send('Page not found');
      }
      pageData = page.data;
      pageTitle = page.title;
    }

    // Generate HTML from Puck data
    const html = this.generatePreviewHTML(pageData, pageTitle);

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @Put(':slug')
  update(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Body('data') data: any
  ) {
    return this.pagesService.update(siteId, slug, data);
  }

  private cleanupOldPreviewData() {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    for (const [key, value] of previewDataStore.entries()) {
      if (value.timestamp < oneHourAgo) {
        previewDataStore.delete(key);
      }
    }
  }

  private generatePreviewHTML(data: any, title: string): string {
    // Basic HTML template for preview
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .preview-banner {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f59e0b;
            color: white;
            text-align: center;
            padding: 8px;
            font-size: 14px;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div class="preview-banner">
        🎭 Preview Mode - This is how your page will look to visitors
    </div>
    <div style="margin-top: 40px;">
        ${this.renderPuckData(data)}
    </div>
</body>
</html>`;
  }

  private renderPuckData(data: any): string {
    if (!data || !data.root || !data.root.zones) {
      return '<div class="p-8 text-center text-gray-500">No content available</div>';
    }

    let html = '';

    // Render content zone
    if (data.root.zones.content) {
      html += '<div class="max-w-4xl mx-auto px-4 py-8">';
      for (const component of data.root.zones.content) {
        html += this.renderComponent(component);
      }
      html += '</div>';
    }

    return html;
  }

  private renderComponent(component: any): string {
    if (!component || !component.type) return '';

    switch (component.type) {
      case 'Heading':
        const level = component.props?.level || 2;
        const tag = `h${level}`;
        const align = component.props?.textAlign || 'left';
        const color = component.props?.color || '#1F2937';
        const title = component.props?.title || 'Heading';

        return `<${tag} class="font-bold mb-4" style="text-align: ${align}; color: ${color};">${title}</${tag}>`;

      case 'Text':
        const text = component.props?.text || '';
        const textAlign = component.props?.textAlign || 'left';
        const textColor = component.props?.color || '#374151';

        return `<p class="mb-4" style="text-align: ${textAlign}; color: ${textColor};">${text}</p>`;

      case 'Button':
        const buttonText = component.props?.text || 'Button';
        const buttonVariant = component.props?.variant || 'default';
        const buttonClass =
          buttonVariant === 'outline'
            ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'bg-blue-600 text-white hover:bg-blue-700';

        return `<button class="px-4 py-2 rounded-md font-medium ${buttonClass}">${buttonText}</button>`;

      case 'Card':
        const cardTitle = component.props?.title || 'Card Title';
        const cardContent =
          component.props?.content || 'Card content goes here.';

        return `
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
            <h3 class="text-lg font-semibold mb-2">${cardTitle}</h3>
            <p class="text-gray-600">${cardContent}</p>
          </div>`;

      case 'Grid':
        const columns = component.props?.columns || 1;
        const gap = component.props?.gap || 4;
        const gridClass = `grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`;

        let gridHtml = `<div class="${gridClass} mb-4">`;
        if (component.props?.items) {
          for (const item of component.props.items) {
            gridHtml += `<div class="bg-gray-100 p-4 rounded">${item}</div>`;
          }
        }
        gridHtml += '</div>';
        return gridHtml;

      default:
        return `<div class="p-4 bg-gray-100 rounded mb-4">Unknown component: ${component.type}</div>`;
    }
  }
}
