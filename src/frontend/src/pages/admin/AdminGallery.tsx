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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { GalleryItem } from "../../backend";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";

type GForm = {
  imageUrl: string;
  caption: string;
  itemType: string;
  sortOrder: string;
};
const EMPTY: GForm = {
  imageUrl: "",
  caption: "",
  itemType: "lifestyle",
  sortOrder: "0",
};

export default function AdminGallery() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<GForm>(EMPTY);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading, progress } = useStorageUpload();

  const { data: items } = useQuery<GalleryItem[]>({
    queryKey: ["gallery", ""],
    queryFn: () => actor!.getGallery(null),
    enabled: !!actor,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["gallery"] });

  const createMut = useMutation({
    mutationFn: () =>
      actor!.createGalleryItem(
        form.imageUrl,
        form.caption,
        form.itemType,
        BigInt(form.sortOrder || "0"),
      ),
    onSuccess: () => {
      toast.success("Added");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      actor!.updateGalleryItem(
        editing!.id,
        form.imageUrl,
        form.caption,
        form.itemType,
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
    mutationFn: (id: bigint) => actor!.deleteGalleryItem(id),
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({
      imageUrl: item.imageUrl,
      caption: item.caption,
      itemType: item.itemType,
      sortOrder: String(item.sortOrder),
    });
    setOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold">Gallery / Media</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => {
                setEditing(null);
                setForm(EMPTY);
                setOpen(true);
              }}
              data-ocid="admin.gallery.add_button"
            >
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Gallery Item</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editing ? updateMut.mutate() : createMut.mutate();
              }}
              className="space-y-3 mt-2"
            >
              {/* File Upload */}
              <div>
                <Label>Upload Image</Label>
                <div
                  className="mt-1 border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors"
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
                    const file = e.dataTransfer.files?.[0];
                    if (!file || !file.type.startsWith("image/")) return;
                    try {
                      const url = await uploadFile(file);
                      setForm((f) => ({ ...f, imageUrl: url }));
                      toast.success("Image uploaded");
                    } catch {
                      toast.error("Upload failed");
                    }
                  }}
                  data-ocid="admin.gallery.dropzone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Upload
                    className="mx-auto mb-2 text-muted-foreground"
                    size={20}
                  />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or{" "}
                    <span style={{ color: "gold" }}>click to browse</span>
                  </p>
                </div>
                {uploading && (
                  <div className="mt-2" data-ocid="admin.gallery.loading_state">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploading... {progress}%
                    </p>
                  </div>
                )}
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Fallback URL */}
              <div>
                <Label>Or enter image URL manually</Label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  placeholder="https://..."
                  data-ocid="admin.gallery.input"
                />
              </div>
              <div>
                <Label>Caption</Label>
                <Input
                  value={form.caption}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, caption: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={form.itemType}
                  onValueChange={(v) => setForm((f) => ({ ...f, itemType: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="bulk">Bulk Orders</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                  </SelectContent>
                </Select>
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
                data-ocid="admin.gallery.submit_button"
              >
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(items ?? []).map((item, i) => (
          <div
            key={String(item.id)}
            className="rounded-lg overflow-hidden border border-border group relative"
            data-ocid={`admin.gallery.item.${i + 1}`}
          >
            <img
              src={item.imageUrl}
              alt={item.caption}
              className="w-full aspect-square object-cover"
            />
            <div className="p-2 text-xs text-muted-foreground truncate">
              {item.caption}
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
                onClick={() => openEdit(item)}
                data-ocid={`admin.gallery.edit_button.${i + 1}`}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-6 text-xs"
                onClick={() => deleteMut.mutate(item.id)}
                data-ocid={`admin.gallery.delete_button.${i + 1}`}
              >
                Del
              </Button>
            </div>
          </div>
        ))}
        {(!items || items.length === 0) && (
          <div
            className="col-span-4 text-center py-12 text-muted-foreground"
            data-ocid="admin.gallery.empty_state"
          >
            No gallery items yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
