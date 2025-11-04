---
layout: post
title:  "Autodesk Maya - Pythonコード集"
author: licht
categories: [ maya, python ]
# tags: [red, yellow]
image: assets/images/maya_logo.jpg
beforetoc: "「Autodesk Maya」で使用する、Pythonコードをまとめたページ。"
toc: true
featured: true
hidden: false
---

## 環境設定

### 取得

#### 実行しているMayaのインストールパスを取得 -> str

```py
import os

maya_location: str = os.environ["MAYA_LOCATION"]
# >>> "C:/Program Files/Autodesk/Maya2024"
```

#### スクリプトパスを全て取得 -> list[str]

```py
import os

script_paths: list[str] = [path for path in os.environ["MAYA_SCRIPT_PATH"].split(";")[:-1]]
# >>> ['C:/Users/owner/scripts', ...]
```

#### プラグインパスをすべて取得 -> list[str]

```py
import os

plugin_paths: list[str] = [path for path in os.environ["MAYA_PLUG_IN_PATH"].split(";")[:-1]]
# >>> ['C:/Users/owner/Documents/maya/2024/plug-ins', ...]
```

#### モジュールパスを全て取得 -> list[str]

```py
import os

module_paths: list[str] = [path for path in os.environ["MAYA_MODULE_PATH"].split(";")[:-1]]
# >>> ['C:/Program Files/Autodesk/Maya2024/modules', ...]
```

#### PYTHONPATHを全て取得 -> list[str]

```py
import sys

python_paths: list[str] = [path for path in sys.path]
# >>> ['C:/Users/owner/Documents/maya/2024/scripts/site-packages', ...]
```

#### pythonのバージョンを取得 -> str

```py
import sys

python_version: str = sys.version
# >>> "3.10.10 (tags/v3.10.10:721ac2e, Aug 17 2023, 20:49:22) [MSC v.1929 64 bit (AMD64)]"
```

#### pythonのメジャーバージョンを取得 -> str

```py
import sys

python_major_version: str = str(sys.version_info.major)
# >>> "3"
```

#### pythonのマイナーバージョンを取得 -> str

```py
import sys

python_minor_version: str = sys.version_info.minor
# >>> "10"
```

### 設定

#### スクリプト自身のディレクトリをPythonパスに追加 -> None

```py
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent))
```

#### リモートデバッグ用にコマンドポートを開く -> None

```py
import maya.cmds as cmds

# connect_command_port("4434")  # Maya 2023
# connect_command_port("4435")  # Maya 2024
# connect_command_port("4436")  # Maya 2025
if not cmds.commandPort("4434", q=True):
    cmds.commandPort(n="4434")
```

この関数は単体では機能として成立しません。
以下のようなページを参考に、コードエディタ側の設定も行う必要があります。

- [MayaのスクリプトをPyCharmで楽にコーディングする](https://qiita.com/paty-6991/items/cdb59416761e9f35008f)
- [Visual Studio Codeの機能拡張「MayaCode」でスクリプトを直接MAYAに送信・実行する方法](https://liquidjumper.com/programming/python/visual-studio-code_mayacode_maya)

***

### 参考資料

- [環境変数(Maya 公式)](https://help.autodesk.com/view/MAYAUL/2024/JPN/?guid=GUID-925EB3B5-1839-45ED-AA2E-3184E3A45AC7)
- [MayaCharm README.md](https://github.com/cmcpasserby/MayaCharm/blob/master/README.md)
