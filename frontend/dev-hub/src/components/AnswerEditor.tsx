"use client"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswer } from "@/redux/answerSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import RcTiptapEditor from "reactjs-tiptap-editor";
import {
  Attachment,
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  Image,
  ExportPdf,
  ExportWord,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  ImportWord,
  Indent,
  Italic,
  Katex,
  LineHeight,
  Link,
  Mention,
  Mermaid,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TableOfContents,
  TaskList,
  TextAlign,
  TextDirection,
  Twitter,
  Underline,
} from "reactjs-tiptap-editor/extension-bundle";
// ✅ image upload (Blob URL)
const handleImageUpload = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

// Move the base64 conversion function outside to avoid redefinition
function convertBase64ToBlob(base64: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: { showOnlyCurrent: true },
    characterCount: { limit: 50_000 },
  }),
  History,
  SearchAndReplace,
  TextDirection,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Katex,
  Emoji,
  Image.configure({
    upload: handleImageUpload, 
    resourceImage: "both", 
    acceptMimes: ["image/png", "image/jpeg"],
    maxSize: 5 * 1024 * 1024, 
  }),

  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({ spacer: true, taskItem: { nested: true } }),
  Link,
  Blockquote.configure({ spacer: true }),
  SlashCommand,
  HorizontalRule,
  Code.configure({ toolbar: false }),
  CodeBlock.configure({ defaultTheme: "dracula" }),
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
    upload: (files: File[]) => {
      const f = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      return Promise.resolve(f);
    },
  }),
  ExportWord,
  Mention,
  Attachment.configure({
    upload: (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
  Mermaid.configure({
    upload: (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
  Twitter,
];
import "reactjs-tiptap-editor/style.css";

export default function AnswerEditor({ questionId }: { questionId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.warn("Answer cannot be empty!"); // ✅ Empty check
      return;
    }

    setLoading(true);
    try {
      await dispatch(postAnswer({ questionId, text: content })).unwrap();
      toast.success("Answer posted successfully!");
      setContent(""); // Clear content after successful post
    } catch (error) {
      toast.error("Failed to post answer!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      {/* Tiptap Editor */}
      <RcTiptapEditor
        content={content}
        onChangeContent={setContent}
        extensions={extensions}
        output="html" // Change to 'json' if needed
      />

      {/* Flex button */}
      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className={`px-4 py-2 text-white rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 transition"
          }`}
        >
          {loading ? "Posting..." : "Submit Answer"}
        </button>
      </div>
    </form>
  );
}
