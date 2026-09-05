"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { onInvoke } from "../actions";

const formSchema = z.object({
  content: z
    .string()
    .min(1, "Project description is required")
    .max(1000, "Description is too long"),
});

const PROJECT_TEMPLATES = [
  {
    emoji: "🎬",
    title: "Build a Netflix clone",
    glowColor:
      "group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
    gradient: "from-red-500/15 via-rose-500/5 to-transparent",
    iconBg: "group-hover:bg-red-500/10",
    prompt:
      "Build a Netflix-style homepage with a hero banner (use a nice, dark-mode compatible gradient here), movie sections, responsive cards, and a modal for viewing details using mock data and local state. Use dark mode.",
  },
  {
    emoji: "📦",
    title: "Build an admin dashboard",
    glowColor:
      "group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    gradient: "from-blue-500/15 via-cyan-500/5 to-transparent",
    iconBg: "group-hover:bg-blue-500/10",
    prompt:
      "Create an admin dashboard with a sidebar, stat cards, a chart placeholder, and a basic table with filter and pagination using local state. Use clear visual grouping and balance in your design for a modern, professional look.",
  },
  {
    emoji: "📋",
    title: "Build a kanban board",
    glowColor:
      "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    gradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    iconBg: "group-hover:bg-emerald-500/10",
    prompt:
      "Build a kanban board with drag-and-drop using react-beautiful-dnd and support for adding and removing tasks with local state. Use consistent spacing, column widths, and hover effects for a polished UI.",
  },
  {
    emoji: "🗂️",
    title: "Build a file manager",
    glowColor:
      "group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    gradient: "from-amber-500/15 via-yellow-500/5 to-transparent",
    iconBg: "group-hover:bg-amber-500/10",
    prompt:
      "Build a file manager with folder list, file grid, and options to rename or delete items using mock data and local state. Focus on spacing, clear icons, and visual distinction between folders and files.",
  },
  {
    emoji: "📺",
    title: "Build a YouTube clone",
    glowColor:
      "group-hover:border-rose-500/50 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]",
    gradient: "from-rose-500/15 via-orange-500/5 to-transparent",
    iconBg: "group-hover:bg-rose-500/10",
    prompt:
      "Build a YouTube-style homepage with mock video thumbnails, a category sidebar, and a modal preview with title and description using local state. Ensure clean alignment and a well-organized grid layout.",
  },
  {
    emoji: "🛍️",
    title: "Build a store page",
    glowColor:
      "group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]",
    gradient: "from-violet-500/15 via-purple-500/5 to-transparent",
    iconBg: "group-hover:bg-violet-500/10",
    prompt:
      "Build a store page with category filters, a product grid, and local cart logic to add and remove items. Focus on clear typography, spacing, and button states for a great e-commerce UI.",
  },
  {
    emoji: "🏡",
    title: "Build an Airbnb clone",
    glowColor:
      "group-hover:border-pink-500/50 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]",
    gradient: "from-pink-500/15 via-rose-500/5 to-transparent",
    iconBg: "group-hover:bg-pink-500/10",
    prompt:
      "Build an Airbnb-style listings grid with mock data, filter sidebar, and a modal with property details using local state. Use card spacing, soft shadows, and clean layout for a welcoming design.",
  },
  {
    emoji: "🎵",
    title: "Build a Spotify clone",
    glowColor:
      "group-hover:border-green-500/50 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    gradient: "from-green-500/15 via-emerald-500/5 to-transparent",
    iconBg: "group-hover:bg-green-500/10",
    prompt:
      "Build a Spotify-style music player with a sidebar for playlists, a main area for song details, and playback controls. Use local state for managing playback and song selection. Prioritize layout balance and intuitive control placement for a smooth user experience. Use dark mode.",
  },
];

const ProjectsForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const contentValue = form.watch("content");

  const handleTemplate = (prompt) => {
    form.setValue("content", prompt, { shouldValidate: true });
  };

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  const onInvokeAI = async () => {
    try {
      const res = await onInvoke();
      console.log(res);
      toast.success("Done");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Template Grid */}
      <Button onClick={onInvokeAI}>
        Invoke AI Agent
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PROJECT_TEMPLATES.map((template, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleTemplate(template.prompt)}
            className={cn(
              "group relative p-4 rounded-xl border bg-card text-left overflow-hidden",
              "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]",
              template.glowColor
            )}
          >
            {/* Multi-Color Gradient Mesh on Hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                template.gradient
              )}
            />

            <div className="relative z-10 flex flex-col gap-2">
              <span
                className={cn(
                  "text-3xl w-fit inline-flex items-center justify-center p-1 rounded-lg transition-all duration-300 ease-out",
                  "group-hover:scale-125 group-hover:rotate-6",
                  template.iconBg
                )}
                role="img"
                aria-label={template.title}
              >
                {template.emoji}
              </span>
              <h3 className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
                {template.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Colorful Gradient Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-3 text-muted-foreground font-medium flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-purple-500 animate-pulse" />
            Or describe your own idea
          </span>
        </div>
      </div>

      {/* Dynamic Colored Glowing Form Container */}
      <div className="relative group">
        {/* Animated Aurora Ambient Glow behind form */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 blur-md transition-all duration-500",
            isFocused ? "opacity-40 blur-lg" : "group-hover:opacity-20"
          )}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all duration-300 ease-out",
              isFocused
                ? "border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.15)] bg-background/95 backdrop-blur-sm"
                : "border-border/60 hover:border-purple-500/30"
            )}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <TextAreaAutosize
                  {...field}
                  placeholder="Describe what you want to create..."
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  minRows={3}
                  maxRows={8}
                  className="pt-4 resize-none border-none w-full outline-none bg-transparent placeholder:text-muted-foreground/60 transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              )}
            />

            <div className="flex gap-x-2 items-end justify-between pt-2">
              <div className="text-[10px] text-muted-foreground font-mono">
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                  <span>&#8984;</span>Enter
                </kbd>
                &nbsp; to submit
              </div>

              {/* Vibrant Animated Submit Button */}
              <Button
                type="submit"
                className={cn(
                  "size-8 rounded-full p-0 transition-all duration-300 ease-out active:scale-90",
                  contentValue?.trim()
                    ? "bg-gradient-to-tr from-violet-600 via-purple-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.45)] hover:scale-110 hover:rotate-3"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                <ArrowUpIcon className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProjectsForm;