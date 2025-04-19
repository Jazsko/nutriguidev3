import { createClient } from '@/utils/supabase/server'
import { createClient as createBrowserClient } from '@/utils/supabase/client'

export async function FetchDataSteps() {
  const supabase = await createClient()
  const { data: serverData } = await supabase.from('notes').select('*')

  const browserSupabase = createBrowserClient()
  const { data: browserData } = await browserSupabase.from('notes').select('*')

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Fetch Data Steps</h2>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Server Data</h3>
          <pre className="text-sm">{JSON.stringify(serverData, null, 2)}</pre>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Browser Data</h3>
          <pre className="text-sm">{JSON.stringify(browserData, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
