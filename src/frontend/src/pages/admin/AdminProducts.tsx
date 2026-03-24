import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Category, Product } from "../../backend";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";

type ProductForm = {
  categoryId: string;
  name: string;
  description: string;
  moq: string;
  imageUrls: string[];
  manualUrls: string;
  featured: boolean;
};

const EMPTY: ProductForm = {
  categoryId: "",
  name: "",
  description: "",
  moq: "",
  imageUrls: [],
  manualUrls: "",
  featured: false,
};

export default function AdminProducts() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading, progress } = useStorageUpload();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products", null],
    queryFn: () => actor!.getProducts(null),
    enabled: !!actor,
  });
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["products"] });

  const allImageUrls = () => [
    ...form.imageUrls,
    ...form.manualUrls
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
  ];

  const createMutation = useMutation({
    mutationFn: () =>
      actor!.createProduct(
        BigInt(form.categoryId || "0"),
        form.name,
        form.description,
        form.moq,
        allImageUrls(),
        form.featured,
      ),
    onSuccess: () => {
      toast.success("Product created");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed to create product"),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      actor!.updateProduct(
        editing!.id,
        BigInt(form.categoryId || "0"),
        form.name,
        form.description,
        form.moq,
        allImageUrls(),
        form.featured,
      ),
    onSuccess: () => {
      toast.success("Product updated");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: bigint) => actor!.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted");
      invalidate();
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      categoryId: String(p.categoryId),
      name: p.name,
      description: p.description,
      moq: p.moq,
      imageUrls: p.imageUrls,
      manualUrls: "",
      featured: p.featured,
    });
    setOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const urls: string[] = [];
    for (const file of files) {
      try {
        const url = await uploadFile(file);
        urls.push(url);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    setForm((f) => ({ ...f, imageUrls: [...f.imageUrls, ...urls] }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeUploadedUrl = (idx: number) => {
    setForm((f) => ({
      ...f,
      imageUrls: f.imageUrls.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editing ? updateMutation.mutate() : createMutation.mutate();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold">Products</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={openCreate}
              data-ocid="admin.add_button"
            >
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label>Category</Label>
                <Select
                  value={form.categoryId}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, categoryId: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((c) => (
                      <SelectItem key={String(c.id)} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  data-ocid="admin.products.input"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Wholesale Price / MOQ</Label>
                <Input
                  value={form.moq}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, moq: e.target.value }))
                  }
                  placeholder="e.g. $5 / 50 pieces min"
                />
              </div>

              {/* File Upload */}
              <div>
                <Label>Upload Product Images</Label>
                <div
                  className="mt-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
                  style={{
                    borderColor: uploading ? "gold" : "#333",
                    background: "#111",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      fileInputRef.current?.click();
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files).filter((f) =>
                      f.type.startsWith("image/"),
                    );
                    if (!files.length) return;
                    const urls: string[] = [];
                    for (const file of files) {
                      try {
                        const url = await uploadFile(file);
                        urls.push(url);
                      } catch {
                        toast.error(`Failed to upload ${file.name}`);
                      }
                    }
                    setForm((f) => ({
                      ...f,
                      imageUrls: [...f.imageUrls, ...urls],
                    }));
                  }}
                  data-ocid="admin.products.dropzone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Upload
                    className="mx-auto mb-2 text-muted-foreground"
                    size={24}
                  />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop images or{" "}
                    <span style={{ color: "gold" }}>click to browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, WEBP supported
                  </p>
                </div>
                {uploading && (
                  <div
                    className="mt-2"
                    data-ocid="admin.products.loading_state"
                  >
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploading... {progress}%
                    </p>
                  </div>
                )}
                {form.imageUrls.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.imageUrls.map((url, i) => (
                      <div key={url} className="relative group">
                        <img
                          src={url}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeUploadedUrl(i)}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "crimson" }}
                        >
                          <X size={10} color="#fff" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Manual URL fallback */}
              <div>
                <Label>Or enter image URLs manually (one per line)</Label>
                <Textarea
                  value={form.manualUrls}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, manualUrls: e.target.value }))
                  }
                  rows={2}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={form.featured}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, featured: v }))
                  }
                />
                <Label>Featured Product</Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  uploading
                }
                data-ocid="admin.products.submit_button"
              >
                {editing ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table data-ocid="admin.products.table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>MOQ / Price</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(products ?? []).length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.products.empty_state"
              >
                No products yet. Add your first product.
              </TableCell>
            </TableRow>
          )}
          {(products ?? []).map((p, i) => (
            <TableRow
              key={String(p.id)}
              data-ocid={`admin.products.item.${i + 1}`}
            >
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {p.moq}
              </TableCell>
              <TableCell>
                {p.featured ? (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Yes
                  </Badge>
                ) : null}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(p)}
                    data-ocid={`admin.products.edit_button.${i + 1}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(p.id)}
                    data-ocid={`admin.products.delete_button.${i + 1}`}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
}
