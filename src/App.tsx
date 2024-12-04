import React, { useRef, useState } from 'react'
import { Md2Poster, Md2PosterContent, Md2PosterHeader, Md2PosterFooter } from './packages'
import Editor from '@monaco-editor/react'
import './App.css'

function App() {
  const markdownRef = useRef<any>(null);
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Introduction
This is a **powerful** markdown editor that supports various formatting options.

### Features
* Basic formatting: **bold**, *italic*, and ~~strikethrough~~
* Links: [Visit our website](https://example.com)
* Lists and quotes

## Code Example
\`\`\`javascript
const greeting = "Hello World!";
console.log(greeting);
\`\`\`

> "The best way to predict the future is to invent it."
> - Alan Kay

#### Additional Resources
1. First item
2. Second item

---
Feel free to edit this content!`);
 
  const handleCopy = () => {
    markdownRef?.current?.handleCopy().then((res) => {
      alert('promise copy')
    });
  };

  const copySuccessCallback = () => {
    console.log('Copy Success');
  }

  return (
    <main className="flex gap-4 p-4 min-h-screen">
      {/* 左侧编辑区域 */}
      <div className="w-1/2 overflow-y-auto" style={{ maxHeight: '100vh' }}>
        <Editor
          height="500px"
          defaultLanguage="markdown"
          defaultValue={markdown}
          onChange={(value) => setMarkdown(value ?? '')}
          options={{
            wordWrap: 'on',          // 启用自动换行
            wrappingStrategy: 'advanced',
            wordWrapColumn: 80,      // 设置换行的列数
            minimap: {               // 可选：配置右侧预览
              enabled: true,         // 启用小地图
              maxColumn: 120         // 设置小地图最大列数
            }
          }}
        />
      </div>

      {/* 右侧预览区域 */}
      <div className="w-1/2 overflow-y-auto" style={{ maxHeight: '100vh' }}>
        <Md2Poster theme="SpringGradientWave" size='mobile' ref={markdownRef} copySuccessCallback={copySuccessCallback} canCopy>
          <Md2PosterHeader className='flex justify-between items-center px-4'>
            <span>@Nickname</span>
            <span>{new Date().toISOString().slice(0, 10)}</span>
          </Md2PosterHeader>
          <Md2PosterContent>{markdown}</Md2PosterContent>
          <Md2PosterFooter className='flex justify-center items-center gap-1'>
             <button onClick={handleCopy} className='border p-2 rounded border-white'>Copy Image</button>
          </Md2PosterFooter>
        </Md2Poster>
      </div>
    </main>
  )
}

export default App
