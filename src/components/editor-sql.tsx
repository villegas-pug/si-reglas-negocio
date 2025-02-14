import { FC, useEffect } from 'react'

import ace from 'ace-builds'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

// SUPER HACK FOR ADDING SNIPPETS
/* ace.define('ace/snippets/sql', ['require', 'exports', 'module'], (e, t, n) => {
   // eslint-disable-next-line
  (t.snippetText = snippet), (t.scope = 'sql');
})
*/

type Props = {
   sentenciaSql: string
   onChange?: (value: string) => void
   width?: number
}

export const Editor: FC<Props> = ({ sentenciaSql, width = 850, onChange }) => {
   const name = 'unique name'
   useEffect(() => {
      const langTools = ace.require('ace/ext/language_tools')
      // data stub:
      const sqlTables = [
         { name: 'SimMovMigra', description: 'Control Migratorio' },
         { name: 'SimPersona', description: 'Control Migratorio' },
         { name: 'SimDependencia', description: '...' },
         { name: 'SimCalidadMigratoria', description: '...' }
      ]

      const sqlTablesCompleter = {
         getCompletions: (_editor: any, _session: any, _pos: any, _prefix: any, callback: any) => {
            callback(
               null,
               sqlTables.map((table) => ({
                  caption: `${table.name}: ${table.description}`,
                  value: table.name,
                  meta: 'Table'
               }))
            )
         }
      }
      langTools.addCompleter(sqlTablesCompleter)
   }, [])

   return (
      <AceEditor
         focus
         mode='sql'
         theme='github'
         name={name}
         width={`${width}px`}
         value={sentenciaSql}
         editorProps={{ $blockScrolling: true }}
         setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            fontSize: 15
         }}
         onChange={ onChange }
      />
   )
}
