'use client';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write a detailed description of your product...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl('');
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  };

  return (
    <div className='border rounded-md'>
      <div className='flex flex-wrap gap-1 p-1 border-b'>
        <Toggle
          size='sm'
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label='Toggle bold'
        >
          <Bold className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label='Toggle italic'
        >
          <Italic className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label='Toggle heading 2'
        >
          <Heading2 className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('heading', { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label='Toggle heading 3'
        >
          <Heading3 className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label='Toggle bullet list'
        >
          <List className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('orderedList')}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label='Toggle ordered list'
        >
          <ListOrdered className='h-4 w-4' />
        </Toggle>
        <Popover>
          <PopoverTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive('link')}
              aria-label='Add link'
            >
              <LinkIcon className='h-4 w-4' />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='flex flex-col gap-2'>
              <Input
                placeholder='https://example.com'
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Button size='sm' onClick={addLink}>
                Add Link
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Toggle size='sm' aria-label='Add image'>
              <ImageIcon className='h-4 w-4' />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='flex flex-col gap-2'>
              <Input
                placeholder='https://example.com/image.jpg'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button size='sm' onClick={addImage}>
                Add Image
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Toggle
          size='sm'
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign('left').run()
          }
          aria-label='Align left'
        >
          <AlignLeft className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign('center').run()
          }
          aria-label='Align center'
        >
          <AlignCenter className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign('right').run()
          }
          aria-label='Align right'
        >
          <AlignRight className='h-4 w-4' />
        </Toggle>
      </div>
      <EditorContent
        editor={editor}
        className='p-4 min-h-[200px] prose prose-sm max-w-none'
      />
    </div>
  );
}
