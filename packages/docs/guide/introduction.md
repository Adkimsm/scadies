# Introduction

怎么说呢，这个项目的来历其实挺无厘头的。

市面上，博客系统主要分两类，动态、静态。他们的区分主要就在于数据，动态博客的数据从数据库中取出，静态博客则是生成 HTML ，直接渲染，理论上比动态博客快。动态博客主要有 Typecho WordPress Ghost Halo 等，静态博客有 Jekkyll Hexo Hugo 等。

动态博客中，数据库几乎都使用 MySQL，~~这种数据库不易白嫖~~我对这种数据库十分不欣赏，~~MongoDB yyds~~ 再加上只有 Ghost 使用 JavaScript 开发~~我不会 PHP 也不会 Java~~，对我个人十分不友好，于是我本着~~自己东西自己造~~面向自己编程的原则，就决定自己造个动态博客系统出来。（如你所见，本项目的宣传语中特意标注了 Free ）

## 前后端分离

本项目采用前后端分离的架构，给予了前端开发人员极大的自由。只要你愿意，你甚至可以用原生 HTML 构造你的博客前端。你也可以用 Scadies 作为数据源开发 App 。

同样因为前后端分离，后端开发人员也可以不再受前端的困扰。

## TypeScript & Express 驱动

Express 驱动，简单易上手；TypeScript 驱动，不失安全性。

~~Express.ts = The Best Web Framework in the Earth!~~