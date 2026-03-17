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
import { useState } from "react";
import { toast } from "sonner";
import type { Category, Product } from "../../backend";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";

type ProductForm = {
  categoryId: string;
  name: string;
  description: string;
  moq: string;
  imageUrls: string;
  featured: boolean;
};
const EMPTY: ProductForm = {
  categoryId: "",
  name: "",
  description: "",
  moq: "",
  imageUrls: "",
  featured: false,
};

export default function AdminProducts() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY);

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

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  const createMutation = useMutation({
    mutationFn: () =>
      actor!.createProduct(
        BigInt(form.categoryId || "0"),
        form.name,
        form.description,
        form.moq,
        form.imageUrls
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
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
        form.imageUrls
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
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
    const cat = categories?.find((c) => c.id === p.categoryId);
    setForm({
      categoryId: cat ? String(cat.id) : "",
      name: p.name,
      description: p.description,
      moq: p.moq,
      imageUrls: p.imageUrls.join("\n"),
      featured: p.featured,
    });
    setOpen(true);
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
          <DialogContent className="max-w-lg">
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
                <Label>MOQ</Label>
                <Input
                  value={form.moq}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, moq: e.target.value }))
                  }
                  placeholder="e.g. 50 pieces"
                />
              </div>
              <div>
                <Label>Image URLs (one per line)</Label>
                <Textarea
                  value={form.imageUrls}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrls: e.target.value }))
                  }
                  rows={3}
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
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editing ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table data-ocid="admin.products_table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>MOQ</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((p, i) => (
            <TableRow key={String(p.id)}>
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
                    data-ocid={`admin.edit_button.${i + 1}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(p.id)}
                    data-ocid={`admin.delete_button.${i + 1}`}
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
