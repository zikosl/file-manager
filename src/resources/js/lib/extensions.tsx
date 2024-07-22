import { ReactNode } from 'react';
import { defaultStyles, FileIcon } from 'react-file-icon';


export function FileIconCustom({ extension }: { extension: string }): ReactNode {
  if (extension.startsWith("doc")) {
    return <FileIcon
      // size={48}
      color="#FF8500"
      gradientColor="#FFB900"
      gradientOpacity={1}
      fold={false}
      radius={6}
      type="document"
      glyphColor="rgba(255,255,255,0.6)"
    />
  } else if (extension.startsWith("xls")) {
    return <FileIcon
      // size={48}
      color="#11D51D"
      gradientColor="#82FA6C"
      gradientOpacity={1}
      fold={false}
      radius={6}
      type="spreadsheet"
      glyphColor="rgba(255,255,255,0.6)"
    />
  }
  else if (extension.startsWith("ppt")) {
    return <FileIcon
      // size={48}
      color="#1254F8"
      gradientColor="#00D2FF"
      gradientOpacity={1}
      fold={false}
      radius={6}
      type="presentation"
      glyphColor="rgba(255,255,255,0.6)"
    />
  }
  else if (extension.startsWith("pdf")) {
    return <FileIcon
      // size={48}
      color="#f81253"
      gradientColor="#ff3b55"
      gradientOpacity={1}
      fold={false}
      radius={6}
      type="acrobat"
      glyphColor="rgba(255,255,255,0.6)"
    />
  }

  else if (extension == "mp4" || extension == "avi" || extension == "mov" || extension == "mkv") {
    return <FileIcon
      // size={48}
      type="video"
      labelColor={"orange"}
      labelUppercase
    />
  }
  else if (extension == "png" || extension == "jpeg" || extension == "jpg" || extension == "svg") {

    return <FileIcon
      // size={48}
      type="image"
      color='#f87503'
      extension={extension}
      // labelColor={"mistyrose"}
      {...defaultStyles[extension]}
      labelUppercase
    />
  }
}
