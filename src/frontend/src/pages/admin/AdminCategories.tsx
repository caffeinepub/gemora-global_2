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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Category } from "../../backend";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";

type CatForm = {
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: string;
};
const EMPTY: CatForm = {
  name: "",
  description: "",
  imageUrl: "",
  sortOrder: "0",
};

export default function AdminCategories() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { uploadFile, uploading, progress } = useStorageUpload();
  const imageFileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CatForm>(EMPTY);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["categories"] });

  const createMut = useMutation({
    mutationFn: () =>
      actor!.createCategory(
        form.name,
        form.description,
        form.imageUrl,
        BigInt(form.sortOrder || "0"),
      ),
    onSuccess: () => {
      toast.success("Category created");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      actor!.updateCategory(
        editing!.id,
        form.name,
        form.description,
        form.imageUrl,
        BigInt(form.sortOrder || "0"),
      ),
    onSuccess: () => {
      toast.success("Updated");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: bigint) => actor!.deleteCategory(id),
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({
      name: c.name,
      description: c.description,
      imageUrl: c.imageUrl,
      sortOrder: String(c.sortOrder),
    });
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold">Categories</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={openCreate}
              data-ocid="admin.add_button"
            >
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Category</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editing ? updateMut.mutate() : createMut.mutate();
              }}
              className="space-y-3 mt-2"
            >
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
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label>Category Image</Label>
                <div
                  className="mt-1 border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors"
                  style={{
                    borderColor: uploading ? "#42A5F5" : "#c5cae9",
                    background: "#f5f7ff",
                  }}
                  onClick={() => !uploading && imageFileRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      imageFileRef.current?.click();
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (!file || !file.type.startsWith("image/")) return;
                    try {
                      const url = await uploadFile(file);
                      setForm((f) => ({ ...f, imageUrl: url }));
                      toast.success("Image uploaded");
                    } catch (err) {
                      toast.error(
                        err instanceof Error ? err.message : "Upload failed",
                      );
                    }
                  }}
                  data-ocid="admin.categories.dropzone"
                >
                  <input
                    ref={imageFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await uploadFile(file);
                        setForm((f) => ({ ...f, imageUrl: url }));
                        toast.success("Image uploaded");
                      } catch (err) {
                        toast.error(
                          err instanceof Error ? err.message : "Upload failed",
                        );
                      }
                      if (imageFileRef.current) imageFileRef.current.value = "";
                    }}
                  />
                  <Upload
                    className="mx-auto mb-2 text-muted-foreground"
                    size={20}
                  />
                  <p className="text-sm text-muted-foreground">
                    {uploading
                      ? "Uploading..."
                      : "Click or drag to upload category image"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, WEBP supported
                  </p>
                </div>
                {uploading && (
                  <div
                    className="mt-2"
                    data-ocid="admin.categories.loading_state"
                  >
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploading... {progress}%
                    </p>
                  </div>
                )}
                {form.imageUrl && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={form.imageUrl}
                      alt="Category preview"
                      className="h-20 w-28 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "crimson" }}
                      aria-label="Remove image"
                    >
                      <X size={10} color="#fff" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sortOrder: e.target.value }))
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                disabled={
                  createMut.isPending || updateMut.isPending || uploading
                }
                data-ocid="admin.categories.submit_button"
              >
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Sort</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((c, i) => (
            <TableRow key={String(c.id)}>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {c.description}
              </TableCell>
              <TableCell>{String(c.sortOrder)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(c)}
                    data-ocid={`admin.edit_button.${i + 1}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMut.mutate(c.id)}
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
