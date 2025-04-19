import { createClient } from '@/utils/supabase/server'

export default async function NotesPage() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select('*')

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Notes</h1>
      <div className="grid gap-4">
        {notes?.map((note) => (
          <div key={note.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}