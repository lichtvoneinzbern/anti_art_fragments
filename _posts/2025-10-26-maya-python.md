---
layout: post
title:  "Sandbox"
author: licht
categories: [ maya, python ]
# tags: [red, yellow]
image: assets/images/12.jpg
beforetoc: "D'où venons-nous ? Que sommes-nous ? Où allons-nous ?"
toc: true
featured: true
hidden: false
---

# このページについて

このページでは「**コーディング環境**」を対象にした、コピペで使えるコードをまとめています。

動作確認のできている最新バージョンは以下の通りです。


| 対象   | バージョン                                                                       |
| ------ | -------------------------------------------------------------------------------- |
| Maya   | 2024.2                                                                           |
| Python | 3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)] |

# 取得

## 実行しているMayaのインストールパスを取得 -> str

```py:import
import os
```

```py:get_maya_install_path
os.environ["MAYA_LOCATION"]
```

:::details 出力サンプル

```py
"C:/Program Files/Autodesk/Maya2024"
```

:::

## スクリプトパスを全て取得 -> List[str]

```py:import
import os
```

```py:get_maya_script_paths
[path for path in os.environ["MAYA_SCRIPT_PATH"].split(";")[:-1]]
```

:::details 出力サンプル

```py
['C:/Users/owner/scripts',
 'C:/Users/owner/Documents/maya/2024/scripts',
 'C:/Users/owner/Documents/maya/scripts',
 'C:/Users/owner/Documents/maya/2024/presets',
 'C:/Users/owner/Documents/maya/2024/prefs/shelves',
 'C:/Users/owner/Documents/maya/2024/prefs/markingMenus',
 'C:/Users/owner/Documents/maya/2024/prefs/scripts',
 'C:/Program Files/Autodesk/Maya2024/scripts',
 'C:/Program Files/Autodesk/Maya2024/scripts/startup',
 'C:/Program Files/Autodesk/Maya2024/scripts/shelves',
 'C:/Program Files/Autodesk/Maya2024/scripts/others',
 'C:/Program Files/Autodesk/Maya2024/scripts/AETemplates',
 'C:/Program Files/Autodesk/Maya2024/scripts/unsupported',
 'C:/Program Files/Autodesk/Maya2024/scripts/paintEffects',
 'C:/Program Files/Autodesk/Maya2024/scripts/fluidEffects',
 'C:/Program Files/Autodesk/Maya2024/scripts/hair',
 'C:/Program Files/Autodesk/Maya2024/scripts/cloth',
 'C:/Program Files/Autodesk/Maya2024/scripts/live',
 'C:/Program Files/Autodesk/Maya2024/scripts/fur',
 'C:/Program Files/Autodesk/Maya2024/scripts/muscle',
 'C:/Program Files/Autodesk/Maya2024/scripts/turtle',
 'C:/Program Files/Autodesk/Maya2024/scripts/FBX',
 'C:/Program Files/Autodesk/Maya2024/scripts/mayaHIK',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/ATF/scripts',
 'C:/Program Files/Autodesk/Bifrost/Maya2024/2.7.1.1/bifrost/scripts',
 'C:/Program Files/Common Files/Autodesk/ApplicationPlugins/bifrost/Contents/scripts',
 'C:/Program Files/Autodesk/LookdevX/Maya/2024/1.2.0/plug-ins/lookdevx/scripts',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/MASH/scripts',
 'C:/Program Files/Autodesk/MayaUSD/Maya2024/0.25.0/mayausd/MayaUSD/plugin/adsk/scripts',
 'C:/Program Files/Autodesk/MayaUSD/Maya2024/0.25.0/mayausd/MayaUSD/lib/scripts',
 'C:/Program Files/Autodesk/MayaUSD/Maya2024/0.25.0/mayausd/USD/lib/python',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/fbx/scripts',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/camd/scripts',
 'C:/Program Files/Allegorithmic/Adobe Substance 3D for Maya/2024/scripts',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/sweep/scripts',
 'C:/Program Files/Autodesk/Bifrost/Maya2024/2.7.1.1/vnn/scripts',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/xgen/scripts',
 'C:/Program Files/Autodesk/LookdevX/Maya/2024/1.2.0/plug-ins/lookdevx/AEtemplate',
 'C:/Program Files/Autodesk/MayaUSD/Maya2024/0.25.0/mayausd/MayaUSD/lib/python']
```

:::

## プラグインパスをすべて取得 -> List[str]

```py:import
import os
```

```py:get_maya_plugin_paths
[path for path in os.environ["MAYA_PLUG_IN_PATH"].split(";")[:-1]]
```

:::details 出力サンプル

```py
['C:/Users/owner/Documents/maya/2024/plug-ins',
 'C:/Users/owner/Documents/maya/plug-ins',
 'C:/Program Files/Autodesk/Maya2024/bin/plug-ins',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/ATF/plug-ins',
 'C:/Program Files/Autodesk/Bifrost/Maya2024/2.7.1.1/bifrost/plug-ins',
 'C:/Program Files/Common '
 'Files/Autodesk/ApplicationPlugins/bifrost/Contents/plug-ins',
 'C:/Program '
 'Files/Autodesk/LookdevX/Maya/2024/1.2.0/plug-ins/lookdevx/plug-ins',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/MASH/plug-ins',
 'C:/Program Files/Autodesk/MayaUSD/Maya2024/0.25.0/mayausd/MayaUSD/lib/maya',
 'C:/Program '
 'Files/Autodesk/MayaUSD/Maya2024/0.25.0/mayausd/MayaUSD/plugin/adsk/plugin',
 'C:/Program Files/Autodesk/Bifrost/Maya2024/2.7.1.1/bifrost/null',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/fbx/plug-ins',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/camd/plug-ins',
 'C:/Program Files/Allegorithmic/Adobe Substance 3D for Maya/2024/plug-ins',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/sweep/plug-ins',
 'C:/Program Files/Autodesk/Bifrost/Maya2024/2.7.1.1/vnn/plug-ins',
 'C:/Program Files/Autodesk/Maya2024/plug-ins/xgen/plug-ins']
```

:::

## モジュールパスを全て取得 -> List[str]

```py:import
import os
```

```py:get_maya_module_paths
[path for path in os.environ["MAYA_MODULE_PATH"].split(";")[:-1]]
```

:::details 出力サンプル

```py
['C:/Program Files/Autodesk/Maya2024/modules',
 'C:/Users/owner/Documents/maya/2024/modules',
 'C:/Users/owner/Documents/maya/modules']
```

:::

## pythonパスを全て取得 -> List[str]

```py:import
import sys
```

```py:get_python_paths
[path for path in sys.path]
```

:::details 出力サンプル

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

:::

## pythonのバージョンを取得 -> str

```py:import
import sys
```

```py:get_python_version
sys.version
```

:::details 出力サンプル

```py
3.10.8 (tags/v3.10.8:aaaf517, Oct 11 2022, 16:50:30) [MSC v.1933 64 bit (AMD64)]
```

:::

## pythonのメジャーバージョンを取得 -> int

```py:import
import sys
```

```py:get_python_major_version
sys.version_info.major
```

:::details 出力サンプル

```py
3
```

:::

## pythonのマイナーバージョンを取得 -> int

```py:import
import sys
```

```py:get_python_minor_version
sys.version_info.minor
```

:::details 出力サンプル

```py
10
```

:::

# 設定

## スクリプト自身が存在するパスをPythonパスに追加 -> None

```py:import
import sys
from pathlib import Path
```

```py:set_self_path_to_sys_path
sys.path.append(str(Path(__file__).parent))
```

::: message
このコマンドはスクリプトファイル（「.py」という拡張子の付いたファイル）から実行します。
二つのアンダーバーで囲まれた「＿file＿」というコマンドがスクリプトファイル自身のパスが入った変数のようなものです。
スクリプトファイルから実行しないと、この「＿file＿」というコマンドが用意されていません。
例えば、Mayaのスクリプトエディタから実行しようとすると、

```py
# Error: NameError: file <maya console> line 1: name '__file__' is not defined
```

とエラーが表示されてしまいます。
:::

## リモートデバッグ用にコマンドポートを開く -> None

```py:import
import maya.cmds as cmds
```

```py:connect_command_port
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

::: message
この関数は単体では機能として成立しません。
以下のようなページを参考に、コードエディタ側の設定も行う必要があります。

- [MayaのスクリプトをPyCharmで楽にコーディングする](https://qiita.com/paty-6991/items/cdb59416761e9f35008f)
- [Visual Studio Codeの機能拡張「MayaCode」でスクリプトを直接MAYAに送信・実行する方法](https://liquidjumper.com/programming/python/visual-studio-code_mayacode_maya)
  :::


# 参考

- [環境変数(Maya 公式)](https://help.autodesk.com/view/MAYAUL/2024/JPN/?guid=GUID-925EB3B5-1839-45ED-AA2E-3184E3A45AC7)
- [MayaCharm README.md](https://github.com/cmcpasserby/MayaCharm/blob/master/README.md)
