// ==UserScript==
// @name         SampleFocus Account-Free Downloader
// @version      0.1
// @license      MIT
// @namespace    https://nwanne.xyz/
// @description  Alters SampleFocus "Download" button to allow downloads without registration or log-in
// @author       nwanne56
// @match        https://samplefocus.com/samples/*
// @icon         https://d1yg5d5ep3qn10.cloudfront.net/assets/small_logo-a36420f6d100cda6aeb21c64da522058249a9f0537ebd6688139cd6b78cb424d.jpg
// @require      https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/nwanne56/userscripts/master/samplefocus-accountfree-downloader.js
// @downloadURL  https://raw.githubusercontent.com/nwanne56/userscripts/master/samplefocus-accountfree-downloader.js
// @supportURL   https://github.com/nwanne56/userscripts/issues
// @grant GM_download
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(() => {
    'use strict';

    waitForKeyElements("div[data-react-class='SampleWaveform']", addDownload);

    function addDownload(jNode) {
        const soundDiv = document.querySelector("div[data-react-class='SampleWaveform']");
        const sample_mp3_url = JSON.parse(soundDiv.getAttribute("data-react-props")).sample.sample_mp3_url;
        const sample_name = JSON.parse(soundDiv.getAttribute("data-react-props")).sample.name;

        var lastText = jNode.data("lastText") || "";
        if (sample_name != lastText) {
            jNode.data("lastText", sample_name);
        }

        var downloadBtn = document.querySelector("a.btn-large.waves-effect.waves-light.download-link");
        downloadBtn.href = "";
        downloadBtn.onclick = () => {
            const download = GM_download({
                url: sample_mp3_url,
                name: sample_name+".mp3",
                saveAs: true
            });
            window.setTimeout(() => download.abort(), 5000);
            downloadBtn.innerText = "Downloaded!";
        }

        return true;
    }

})();