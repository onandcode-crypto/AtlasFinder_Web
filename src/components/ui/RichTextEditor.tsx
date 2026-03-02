'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-coral underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl max-w-[80%] my-6 mx-auto block shadow-md border border-mid-gray/10',
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] p-6 bg-white border-0 text-charcoal leading-relaxed',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    const addImage = async () => {
        // Create an input element dynamically
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            // Show uploading state (could be improved with a toast)
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                if (res.ok && data.url) {
                    editor.chain().focus().setImage({ src: data.url }).run();
                    toast.success('이미지 업로드 성공');
                } else {
                    toast.error('업로드 실패: ' + (data.error || '알 수 없는 오류'));
                }
            } catch (err) {
                console.error(err);
                toast.error('업로드 중 에러가 발생했습니다.');
            }
        };

        input.click();
    };

    const addLink = () => {
        const url = window.prompt('링크 URL을 입력하세요:');
        if (url && editor) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="flex flex-col border border-mid-gray/20 rounded-xl bg-ivory overflow-hidden">
            <div className="flex flex-wrap gap-2 p-3 border-b border-mid-gray/20 bg-ivory rounded-t-xl sticky top-0 z-10 shadow-sm">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('bold') ? 'bg-coral text-white shadow-sm' : 'hover:bg-white text-charcoal'}`}
                    type="button"
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`px-3 py-1.5 rounded-lg text-sm italic transition-colors ${editor.isActive('italic') ? 'bg-coral text-white shadow-sm' : 'hover:bg-white text-charcoal'}`}
                    type="button"
                >
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`px-3 py-1.5 rounded-lg text-sm line-through transition-colors ${editor.isActive('strike') ? 'bg-coral text-white shadow-sm' : 'hover:bg-white text-charcoal'}`}
                    type="button"
                >
                    S
                </button>
                <div className="w-[1px] h-6 bg-mid-gray/20 mx-1 self-center" />
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-coral text-white shadow-sm' : 'hover:bg-white text-charcoal'}`}
                    type="button"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-coral text-white shadow-sm' : 'hover:bg-white text-charcoal'}`}
                    type="button"
                >
                    H3
                </button>
                <div className="w-[1px] h-6 bg-mid-gray/20 mx-1 self-center" />
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${editor.isActive('bulletList') ? 'bg-coral text-white shadow-sm' : 'hover:bg-white text-charcoal'}`}
                    type="button"
                >
                    • List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${editor.isActive('orderedList') ? 'bg-coral text-white shadow-sm' : 'hover:bg-white text-charcoal'}`}
                    type="button"
                >
                    1. List
                </button>
                <div className="w-[1px] h-6 bg-mid-gray/20 mx-1 self-center" />
                <button onClick={addLink} className="px-3 py-1.5 rounded-lg text-sm hover:bg-white text-charcoal transition-colors" type="button">
                    🔗 Link
                </button>
                <button onClick={addImage} className="px-3 py-1.5 rounded-lg text-sm hover:bg-white text-charcoal transition-colors font-semibold" type="button">
                    🖼 Image
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
