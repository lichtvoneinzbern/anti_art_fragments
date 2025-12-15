---
layout: post
title:  "Autodesk Maya - Pythonチートシート"
author: licht
categories: [ maya ]
tags: [ cheat_sheat ]
image: assets/images/maya_logo.jpg
beforetoc: "「Autodesk Maya」で使用する、Pythonコードをまとめたページ。"
toc: true
featured: false
hidden: false
---

## 一般

### 取得

#### 実行しているMayaのインストールパスを取得 -> str

```py
import os

maya_location: str = os.environ["MAYA_LOCATION"]
# >>> "C:/Program Files/Autodesk/Maya2024"
```

#### 「MAYA_SCRIPT_PATH」を全て取得 -> list[str]

```py
import os

script_paths: list[str] = [path for path in os.environ["MAYA_SCRIPT_PATH"].split(";")[:-1]]
# >>> ['C:/Users/owner/scripts', ...]
```

#### 「MAYA_PLUG_IN_PATH」すべて取得 -> list[str]

```py
import os

plugin_paths: list[str] = [path for path in os.environ["MAYA_PLUG_IN_PATH"].split(";")[:-1]]
# >>> ['C:/Users/owner/Documents/maya/2024/plug-ins', ...]
```

#### 「MAYA_MODULE_PATH」を全て取得 -> list[str]

```py
import os

module_paths: list[str] = [path for path in os.environ["MAYA_MODULE_PATH"].split(";")[:-1]]
# >>> ['C:/Program Files/Autodesk/Maya2024/modules', ...]
```

#### 「PYTHONPATH」を全て取得 -> list[str]

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

### 実行

#### スクリプト自身のディレクトリをPythonパスに追加 -> None

```py
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent))
```

#### リモートデバッグ用にコマンドポートを開く -> None

```py
from maya import cmds

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
- [MayaCharm README.md](https://github.com/cmcpasserby/MayaCharm/blob/master/README.md)

### 参考資料
- [環境変数(Maya 公式)](https://help.autodesk.com/view/MAYAUL/2024/JPN/?guid=GUID-925EB3B5-1839-45ED-AA2E-3184E3A45AC7)

***

## シーン

### 取得

#### 現在開いているシーンのパスを取得 -> str

```py
from maya import cmds

current_scene_path: str = cmds.file(query=True, sceneName=True)
# >>> "C:/Users/owner/Desktop/test.ma"
# シーンが保存されていない場合、空の文字列を返却
```

#### 現在開いているシーンの名前を取得 -> str

```py
from pathlib import Path

from maya import cmds

current_scene_name: str = Path(cmds.file(query=True, sceneName=True)).stem
# >>> "test"
# シーンが保存されていない場合、空の文字列を返却
```


#### 現在開いているシーンの拡張子を取得 -> str

```py
from pathlib import Path

from maya import cmds

current_scene_extention: str = Path(cmds.file(query=True, sceneName=True)).suffix.lstrip('.')
# >>> "ma"
# シーンが保存されていない場合、空の文字列を返却
```

#### 現在開いているシーンが変更されているかを取得 -> bool
```py
from maya import cmds

is_modified: bool = cmds.file(query=True, modified=True)
# >>> True
```


### 実行

#### 新規シーンを開く -> None

```py
from maya import cmds

cmds.file(new=True, force=True)
```

#### 指定したパスのシーンを開く -> None

```py
from maya import cmds

cmds.file("path/to/scene.ma", open=True, force=True, ignoreVersion=True)
```

#### 現在開いているシーンを開き直す -> None

```py
from pathlib import Path

from maya import cmds

current_scene_path: str = cmds.file(query=True, sceneName=True)
if current_scene_path:
    cmds.file(current_scene_path, open=True, force=True)
```

#### 現在のシーンのパスをエクスプローラーで開く -> None
```py
import subprocess
import sys
from pathlib import Path

from maya import cmds

platform: str = sys.platform
scene_dir: str = str(Path(cmds.file(query=True, sceneName=True)).resolve().parent)

if platform == 'Windows':  # win
    subprocess.run(['explorer', f'/open,{scene_dir}'])
elif platform == 'darwin':  # mac
    subprocess.run(['open', scene_dir])
```

## プリファレンス

### 取得

#### 「Joint size」を取得 -> float
```py
from maya import cmds

cmds.jointDisplayScale(query=True, absolute=True)
# >>> 1.0
```

#### 「IK/FK joint size」を取得 -> float
```py
from maya import cmds

cmds.jointDisplayScale(query=True, ikfk=True, absolute=True)
# >>> 0.5
```

#### 「IK handle size」を取得 -> float
```py
from maya import cmds

cmds.ikHandleDisplayScale(query=True)
# >>> 1.0
```

#### 「Up axis」を取得 -> str
```py
from maya import cmds

up_axis: str = cmds.upAxis(query=True, axis=True)
# >>> "z"
```

#### 「Linear」を取得 -> str
```py
from maya import cmds

liner_unit: str = cmds.currentUnit(query=True, linear=True)
# >>> "cm"
```

#### 「Angular」を取得 -> str
```py
from maya import cmds

angular_unit: str = cmds.currentUnit(query=True, angle=True)
# >>> "deg"
```

#### 「Frame rate」を取得 -> str
```py
from maya import cmds

frame_rate: str = cmds.currentUnit(query=True, time=True)
# >>> "game" (15 fpsの場合)
# >>> "film" (24 fpsの場合)
# >>> "pal" (25 fpsの場合)
# >>> "ntsc" (30 fpsの場合)
# >>> "show" (48 fpsの場合)
# >>> "palf" (50 fpsの場合)
# >>> "ntscf" (60 fpsの場合)
# >>> "29.97fps" (上記以外の場合<数値>fpsのstring)
```

#### 「Playback」の開始位置を取得 -> float
```py
from maya import cmds

min_time: float = cmds.playbackOptions(query=True, minTime=True)
# >>> 1.0
```

#### 「Playback」の終了位置を取得 -> float
```py
from maya import cmds

max_time: float = cmds.playbackOptions(query=True, maxTime=True)
# >>> 150.0
```

#### 「Animation」の開始位置を取得 -> float
```py
from maya import cmds

start_time: float = cmds.playbackOptions(query=True, animationStartTime=True)
# >>> 1.0
```

#### 「Animation」の終了位置を取得 -> float
```py
from maya import cmds

end_time: float = cmds.playbackOptions(query=True, animationEndTime=True)
# >>> 250.0
```

## ポリゴン

### 取得

#### フェースの数を取得 -> int
```py
from maya import cmds

face_count: int = cmds.polyEvaluate('node_name', face=True)
# >>> 21
# 名前を指定しない場合は選択されているノードが対象
# transformノードでも、Shapeノードでも取得可能
# Nothing counted : no polygonal object is selected. (ポリゴンを持たないノードの場合はエラー)
```

#### エッジの数を取得 -> int
```py
from maya import cmds

edge_count: int = cmds.polyEvaluate('node_name', edge=True)
# >>> 40
# 名前を指定しない場合は選択されているノードが対象
# transformノードでも、Shapeノードでも取得可能
# Nothing counted : no polygonal object is selected. (ポリゴンを持たないノードの場合はエラー)
```

#### 頂点の数を取得 -> int
```py
from maya import cmds

vertex_count: int = cmds.polyEvaluate('node_name', vertex=True)
# >>> 21
# 名前を指定しない場合は選択されているノードが対象
# transformノードでも、Shapeノードでも取得可能
# Nothing counted : no polygonal object is selected. (ポリゴンを持たないノードの場合はエラー)
```

#### 三角フェースの数を取得 -> int
```py
from maya import cmds

triangle_count: int = cmds.polyEvaluate('node_name', triangle=True)
# >>> 38
# 名前を指定しない場合は選択されているノードが対象
# transformノードでも、Shapeノードでも取得可能
# Nothing counted : no polygonal object is selected. (ポリゴンを持たないノードの場合はエラー)
```

#### バウンディングボックスを取得 -> tuple[tuple[float]]
```py
from maya import cmds

bounding_box: tuple[tuple[float]] = cmds.polyEvaluate('node_name', boundingBox=True)
# >>> ((-1.000000238418579, 1.0), (-1.0, 1.0), (-1.0000004768371582, 1.0000001192092896))
# ((x_min, x_max), (y_min, y_max), (z_min, z_max))
# 名前を指定しない場合は選択されているノードが対象
# transformノードでも、Shapeノードでも取得可能
# Nothing counted : no polygonal object is selected. (ポリゴンを持たないノードの場合はエラー)
```

#### 情報をまとめてを取得 -> dict[str, int]
```py
from maya import cmds

polygon_target_count_info: dict[str, int] = cmds.polyEvaluate('node_name')
# >>> {'vertex': 21, 'edge': 40, 'face': 21, 'uvcoord': 42, 'triangle': 38, 'shell': 1, 'uvShell': 0, 'vertexComponent': 0, 'edgeComponent': 0, 'faceComponent': 0, 'uvComponent': 0, 'triangleComponent': 0}
# 名前を指定しない場合は選択されているノードが対象
# transformノードでも、Shapeノードでも取得可能
# Nothing counted : no polygonal object is selected. (ポリゴンを持たないノードの場合はエラー)
```

