<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

:stop_sign: This wiki has now been deprecated. Please visit [ethereum.org](https://ethereum.org/ja) for up-to-date information on Ethereum. :stop_sign: 



**Contents**

- [ようこそ Ethereum wiki へ](#%E3%82%88%E3%81%86%E3%81%93%E3%81%9D-ethereum-wiki-%E3%81%B8)
  - [日本語翻訳リンク](#%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%BF%BB%E8%A8%B3%E3%83%AA%E3%83%B3%E3%82%AF)
  - [進行状況](#%E9%80%B2%E8%A1%8C%E7%8A%B6%E6%B3%81)
    - [Spurious Dragon](#spurious-dragon)
  - [はじめに](#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
  - [仕様](#%E4%BB%95%E6%A7%98)
  - [ダウンロード](#%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ようこそ Ethereum wiki へ

このページは ÐΞV (Ethereum Core Developer Team) によって開発された 次世代型 P2P 技術基盤 についての情報を集約した wiki であり、
イーサリアムコミュニティによって維持されています。次世代型 P2P 技術基盤 とは以下の内容を含みます。
  
* **Ethereum** : スマートコントラクト開発のために一般化を施した ブロックチェイン   
* **Whisper** : イーサリアムによる private low-level datagram コミュニケーション基盤

どなたでも GitHub にサインインすることで [ブラウザ](https://help.github.com/articles/editing-wiki-pages-via-the-online-interface) や [ローカル環境](https://help.github.com/articles/adding-and-editing-wiki-pages-locally) で記事を追加できます。

## 日本語翻訳リンク

* [[Japanese] Ethereum White Paper](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-White-Paper)
* [[Japanese] Ethereum Development Tutorial](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D--Ethereum-Development-Tutorial)
* [[Japanese] Ethereum Wire Protocol](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-Ethereum-Wire-Protocol)
* [[Japanese] ÐΞVp2p Wire Protocol](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-ÐΞVp2p-Wire-Protocol)
* [[Japanese] libp2p whitepaper](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-libp2p-whitepaper)
* [[Japanese] Patricia Tree](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-Patricia-Tree)
* [[Japanese] RLP](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-RLP)
* [[Japanese] Javascript API](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-Javascript-API)
* [[Japanese] License](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D--Liscence)
* [[Japanese] Whisper](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-Whisper)
* [[Japanese] Whisper PoC2 Protocol](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-Whisper-PoC-2-Protocol-Spec)
* [[Japanese] Design Rationale](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-Design-Rationale)


## 進行状況 

### Spurious Dragon

第4期 Ethereum メジャーリリースとなる Spurious Dragon は 2016年 11月にリリースされました。
現在も Metropolis および Srenity (v1.1) のリリースへ向けて開発が続いています。
Spurious Dragon は、限られたカテゴリのアプリのエンドユーザおよび、[Ðapp developers](https://github.com/ethereum/wiki/wiki/Dapp-Developer-Resources) を対象とした目的のものであり、以前のものと比べ、セキュリティの非常に強固なものとなっています。
来たる Metropolis のリリースの目的は、Mist browser のリリースによるエンドユーザのためのものです。
Serenity のリリースは、コンセンサス (合意形成) プロトコルを、 [Proof-of-Work](https://github.com/ethereum/wiki/wiki/Ethash) から [Proof-of-Stake](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ) へと切り替えることを目的としています。


## はじめに
Ethereum の基本概念の理解としましては [ Whitepaper (日本語版) ](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-White-Paper) や [ Design Rational (日本語版) ](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D-Design-Rationale) もしくは論文 [Yellow Paper (英語版) ](http://gavwood.com/Paper.pdf) をご覧ください。またエンジニアの方は [ Ethereum Development Tutorial (日本語版) ](https://github.com/ethereum/wiki/wiki/%5BJapanese%5D--Ethereum-Development-Tutorial) をご覧ください。

## 仕様
- [Glossary](https://github.com/ethereum/wiki/wiki/Glossary) と [FAQ](https://github.com/ethereum/wiki/wiki/FAQ) は必ずご覧になってください。  
- [C++言語](https://github.com/ethereum/webthree-umbrella/wiki) と [Go言語](https://github.com/ethereum/go-ethereum/wiki) による実装についての wiki です。 ( Python と Javascript 言語につきましてはもうしばらくお待ちください)

## ダウンロード
開発中の ソースコード は以下の git レポジトリの branch からダウンロードできます:
- https://github.com/ethereum/go-ethereum (Go)
- https://github.com/ethereum/webthree-umbrella (C++)
- https://github.com/ethereum/pyethapp (Python)