import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog';
import type {
  Site,
  CreateSiteRequest,
  UpdateSiteRequest,
} from '@/lib/api/sites';
import { siteSchema, type SiteFormData } from '@/lib/validations/sites';

interface SiteFormProps {
  site?: Site;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSiteRequest | UpdateSiteRequest) => void;
  isLoading?: boolean;
}

export function SiteForm({
  site,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: SiteFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SiteFormData>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      name: '',
      slug: '',
      domain: '',
      isPublic: true,
    },
  });

  // Initialize form data when site prop changes
  useEffect(() => {
    if (site) {
      reset({
        name: site.name,
        slug: site.slug,
        domain: site.domain || '',
        isPublic: site.isPublic,
      });
    } else {
      reset({
        name: '',
        slug: '',
        domain: '',
        isPublic: true,
      });
    }
  }, [site, reset]);

  // Auto-generate slug from name
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name' && value.name) {
        const slug = value.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        setValue('slug', slug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const submitHandler = (data: SiteFormData) => {
    // Clean up domain URL
    let cleanDomain = data.domain;
    if (cleanDomain && !cleanDomain.startsWith('http')) {
      cleanDomain = `https://${cleanDomain}`;
    }
    onSubmit({ ...data, domain: cleanDomain || undefined });
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{site ? 'Edit Site' : 'Create New Site'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <Label htmlFor="name">Site Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="My Portfolio"
              error={errors.name?.message}
            />
          </div>

          <div>
            <Label htmlFor="slug">Site URL</Label>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">oceans.app/</span>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="my-portfolio"
                error={errors.slug?.message}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="domain">Custom Domain (Optional)</Label>
            <Input
              id="domain"
              {...register('domain')}
              placeholder="mydomain.com"
              error={errors.domain?.message}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your custom domain without http:// or https://
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isPublic">Public Site</Label>
              <p className="text-xs text-gray-500">
                Allow anyone to view your site
              </p>
            </div>
            <Switch
              id="isPublic"
              checked={watch('isPublic')}
              onCheckedChange={(checked: boolean) =>
                setValue('isPublic', checked, { shouldValidate: true })
              }
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : site ? 'Update Site' : 'Create Site'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
