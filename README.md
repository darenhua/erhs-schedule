<p align="center">
  <a href="" rel="noopener">
 <img src="banner_image.jpg" alt="Project logo"></a>
</p>

<h1 align="center">Eleanor Roosevelt High School Calender</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
    An time-updating calender webpage that organizes online classes. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Credits](#credits)

## 🧐 About <a id = "about"></a>

During the COVID-19 quarantine, Eleanor Roosevelt High School adopted "blended learning", which gave students the choice to attend school on Zoom or in person in one of three different cohorts. As a result, remote school days were very complicated: schedules alternated betwen <i>Day 1's</i>, where you had periods 1-5 and, <i>Day 2's</i>, where you had periods 6-9. At the end of each day, you also had two periods of <i>SGI</i>, which were classes that changed every week according to the principal's email. Students went to the wrong zoom class all the time, and many students constantly missed zoom classes.

The Eleanor Roosevelt High School Calender is a tool I made during blended learning to help myself and classmates keep track of the current class based on the principal's emailed schedule. It uses a JSON file converted from the calender's HTML table, and a txt file with the student's periods 1-9 zoom links.

## 🏁 Getting Started <a id = "getting_started"></a>

A live demo of the website is available on https://darenhua.github.io/erhs-schedule/.

### Downloading

First, download the project from github or the terminal

```
git clone https://github.com/darenhua/erhs-schedule
```

### Setup

1. To setup your calender, inspect the principal's calender email using right click or ctrl+shift+i, and copy the whole calender HTML table.
2. Convert the calender to JSON with https://www.convertjson.com/html-table-to-json.htm. Update calender.json to the your JSON.
3. Update links.txt to your desired zoom links.
4. Then, feel free to use the calender locally with live HTML server or host it from any hosting option.

## ⛏️ Built Using <a id = "built_using"></a>

- HTML, CSS, and Vanilla JS!

## Credits! <a id = "credits"></a>

All credits to Data Design Group, Inc. for the html table to json tool. https://www.convertjson.com/
