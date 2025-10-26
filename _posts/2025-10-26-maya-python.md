---
layout: post
title:  "Autodesk Maya - Pythonコード集"
author: licht
categories: [ maya, python ]
# tags: [red, yellow]
image: assets/images/maya_logo.jpg
beforetoc: "D'où venons-nous ? Que sommes-nous ? Où allons-nous ?"
toc: true
featured: true
hidden: false
---

## このページについて

このページでは「**コーディング環境**」を対象にした、コピペで使えるコードをまとめています。

動作確認のできている最新バージョンは以下の通りです。


| 対象   | バージョン                                                                       |
| ------ | -------------------------------------------------------------------------------- |
| Maya   | 2024.2                                                                           |
| Python | 3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)] |

### 取得

#### 実行しているMayaのインストールパスを取得 -> str

```py
import os
os.environ["MAYA_LOCATION"]
```

出力例
```py
"C:/Program Files/Autodesk/Maya2024"
```

***

#### スクリプトパスを全て取得 -> List[str]

```py
import os
[path for path in os.environ["MAYA_SCRIPT_PATH"].split(";")[:-1]]
```


出力例

```py
['C:/Users/owner/scripts', ...]
```

***

#### プラグインパスをすべて取得 -> List[str]

```py:get_maya_plugin_paths
import os
[path for path in os.environ["MAYA_PLUG_IN_PATH"].split(";")[:-1]]
```

出力例
```py
['C:/Users/owner/Documents/maya/2024/plug-ins', ...]
```

***

#### モジュールパスを全て取得 -> List[str]

```py:get_maya_module_paths
import os
[path for path in os.environ["MAYA_MODULE_PATH"].split(";")[:-1]]
```

出力例
```py
['C:/Program Files/Autodesk/Maya2024/modules', ...]
```

#### pythonパスを全て取得 -> List[str]

```py:get_python_paths
import sys
[path for path in sys.path]
```

<details>
  <summary>出力サンプル</summary>

```py
['C:/Users/owner/Documents/maya/2024/scripts/site-packages',
 'C:\\Program Files\\Autodesk\\Maya2024',
 'C:\\Program Files\\Autodesk\\Maya2024\\plug-ins\\ATF\\scripts',
 'C:\\Program Files\\Autodesk\\Bifrost\\Maya2024\\2.7.1.1\\bifrost\\scripts',
 'C:\\Program Files\\Common '
 'Files\\Autodesk\\ApplicationPlugins\\bifrost\\Contents\\scripts',
 'C:\\Program '
 'Files\\Autodesk\\LookdevX\\Maya\\2024\\1.2.0\\plug-ins\\lookdevx\\scripts',
 'C:\\Program Files\\Autodesk\\Maya2024\\plug-ins\\MASH\\scripts',
 'C:\\Program '
 'Files\\Autodesk\\MayaUSD\\Maya2024\\0.25.0\\mayausd\\MayaUSD\\plugin\\adsk\\scripts',
 'C:\\Program '
 'Files\\Autodesk\\MayaUSD\\Maya2024\\0.25.0\\mayausd\\MayaUSD\\lib\\scripts',
 'C:\\Program '
 'Files\\Autodesk\\MayaUSD\\Maya2024\\0.25.0\\mayausd\\USD\\lib\\python',
 'C:\\Program Files\\Autodesk\\Maya2024\\plug-ins\\fbx\\scripts',
 'C:\\Program Files\\Autodesk\\Maya2024\\plug-ins\\camd\\scripts',
 'C:\\Program Files\\Allegorithmic\\Adobe Substance 3D for Maya\\2024\\scripts',
 'C:\\Program Files\\Autodesk\\Maya2024\\plug-ins\\sweep\\scripts',
 'C:\\Program Files\\Autodesk\\Bifrost\\Maya2024\\2.7.1.1\\vnn\\scripts',
 'C:\\Program Files\\Autodesk\\Maya2024\\plug-ins\\xgen\\scripts',
 'C:\\Program '
 'Files\\Autodesk\\Bifrost\\Maya2024\\2.7.1.1\\bifrost\\python\\site-packages',
 'C:\\Program '
 'Files\\Autodesk\\LookdevX\\Maya\\2024\\1.2.0\\plug-ins\\lookdevx\\python',
 'C:\\Program '
 'Files\\Autodesk\\MayaUSD\\Maya2024\\0.25.0\\mayausd\\MayaUSD\\lib\\python',
 'C:\\Program Files\\Autodesk\\Maya2024\\bin\\python310.zip',
 'C:\\Program Files\\Autodesk\\Maya2024\\Python\\DLLs',
 'C:\\Program Files\\Autodesk\\Maya2024\\Python\\lib',
 'C:\\Program Files\\Autodesk\\Maya2024\\bin',
 'C:\\Program Files\\Autodesk\\Maya2024\\Python',
 'C:\\Program Files\\Autodesk\\Maya2024\\Python\\lib\\site-packages',
 'C:\\Users\\owner\\AppData\\Roaming\\Python\\Python310\\site-packages',
 'C:\\Program Files\\Autodesk\\Maya2024\\bin\\python310.zip\\lib-tk',
 'C:/Users/owner/Documents/maya/2024/prefs/scripts',
 'C:/Users/owner/Documents/maya/2024/scripts',
 'C:/Users/owner/Documents/maya/scripts']

```

</details>

#### pythonのバージョンを取得 -> str

```py:get_python_version
import sys
sys.version
```

<details>
  <summary>出力サンプル</summary>

```py
3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)]
```

</details>

#### pythonのメジャーバージョンを取得 -> int

```py:get_python_major_version
import sys
sys.version_info.major
```

<details>
  <summary>出力サンプル</summary>

```py
3
```

</details>

#### pythonのマイナーバージョンを取得 -> int

```py:get_python_minor_version
import sys
sys.version_info.minor
```

<details>
  <summary>出力サンプル</summary>

```py
10
```

</details>

### 設定

#### スクリプト自身が存在するパスをPythonパスに追加 -> None

```py:set_self_path_to_sys_path
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent))
```

#### リモートデバッグ用にコマンドポートを開く -> None

```py:connect_command_port
import maya.cmds as cmds

def connect_command_port(port_num: str = "4435") -> None:
    """
    コマンドポートを接続(Mayaで使用)

    Args:
        port_num (str): 使用するコマンドポートのポート番号。デフォルトは "4435"（Maya 2024用）

    Examples:
        connect_command_port("4434")  # Maya 2023
        connect_command_port("4435")  # Maya 2024
        connect_command_port("4436")  # Maya 2025

    References:
        https://qiita.com/paty-6991/items/cdb59416761e9f35008f
    """
    if not cmds.commandPort(f":{port_num}", q=True):
        cmds.commandPort(n=f":{port_num}")
```

<details>
  <summary>リモートデバッグを行うには</summary>

この関数は単体では機能として成立しません。
以下のようなページを参考に、コードエディタ側の設定も行う必要があります。

- [MayaのスクリプトをPyCharmで楽にコーディングする](https://qiita.com/paty-6991/items/cdb59416761e9f35008f)
- [Visual Studio Codeの機能拡張「MayaCode」でスクリプトを直接MAYAに送信・実行する方法](https://liquidjumper.com/programming/python/visual-studio-code_mayacode_maya)

</details>


### 参考

- [環境変数(Maya 公式)](https://help.autodesk.com/view/MAYAUL/2024/JPN/?guid=GUID-925EB3B5-1839-45ED-AA2E-3184E3A45AC7)
- [MayaCharm README.md](https://github.com/cmcpasserby/MayaCharm/blob/master/README.md)
