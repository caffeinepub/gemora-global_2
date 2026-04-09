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
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import type { Testimonial } from "../../types";

type TForm = {
  name: string;
  company: string;
  country: string;
  text: string;
  rating: string;
  active: boolean;
};
const EMPTY: TForm = {
  name: "",
  company: "",
  country: "",
  text: "",
  rating: "5",
  active: true,
};

export default function AdminTestimonials() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<TForm>(EMPTY);

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: () => actor!.getTestimonials(),
    enabled: !!actor,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["testimonials"] });

  const createMut = useMutation({
    mutationFn: () =>
      actor!.createTestimonial(
        form.name,
        form.company,
        form.country,
        form.text,
        BigInt(form.rating),
        form.active,
      ),
    onSuccess: () => {
      toast.success("Created");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      actor!.updateTestimonial(
        editing!.id,
        form.name,
        form.company,
        form.country,
        form.text,
        BigInt(form.rating),
        form.active,
      ),
    onSuccess: () => {
      toast.success("Updated");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: bigint) => actor!.deleteTestimonial(id),
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: () => toast.error("Failed"),
  });

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      name: t.name,
      company: t.company,
      country: t.country,
      text: t.text,
      rating: String(t.rating),
      active: t.active,
    });
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold">Testimonials</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => {
                setEditing(null);
                setForm(EMPTY);
                setOpen(true);
              }}
              data-ocid="admin.add_button"
            >
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Testimonial</DialogTitle>
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
                <Label>Company</Label>
                <Input
                  value={form.company}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, company: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, country: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Review</Label>
                <Textarea
                  value={form.text}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, text: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <Label>Rating (1-5)</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rating: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.active}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, active: v }))}
                />
                <Label>Active</Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
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
            <TableHead>Company</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials?.map((t, i) => (
            <TableRow key={String(t.id)}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.company}</TableCell>
              <TableCell>{t.country}</TableCell>
              <TableCell>{String(t.rating)}★</TableCell>
              <TableCell>
                {t.active ? (
                  <Badge className="bg-green-500/20 text-green-400">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(t)}
                    data-ocid={`admin.edit_button.${i + 1}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMut.mutate(t.id)}
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
