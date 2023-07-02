/*
 * Copyright (c) 2023 Yasuaki Gohko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE ABOVE LISTED COPYRIGHT HOLDER(S) BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const hourLabels = [
  document.getElementById("hour0Label"),
  document.getElementById("hour1Label"),
  document.getElementById("hour2Label"),
  document.getElementById("hour3Label"),
  document.getElementById("hour4Label"),
];
const minuteLabels = [
  document.getElementById("minute0Label"),
  document.getElementById("minute1Label"),
  document.getElementById("minute2Label"),
  document.getElementById("minute3Label"),
  document.getElementById("minute4Label"),
  document.getElementById("minute5Label"),
];
const secondLabels = [
  document.getElementById("second0Label"),
  document.getElementById("second1Label"),
  document.getElementById("second2Label"),
  document.getElementById("second3Label"),
  document.getElementById("second4Label"),
  document.getElementById("second5Label"),
];
const decimalLabel = document.getElementById("decimalLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12;
  }
  let hourString = util.getBinaryString(hours, 5);
  hourLabels[0].text = hourString[4];
  hourLabels[1].text = hourString[3];
  hourLabels[2].text = hourString[2];
  hourLabels[3].text = hourString[1];
  hourLabels[4].text = hourString[0];
  let minuteString = util.getBinaryString(today.getMinutes(), 6);
  minuteLabels[0].text = minuteString[5];
  minuteLabels[1].text = minuteString[4];
  minuteLabels[2].text = minuteString[3];
  minuteLabels[3].text = minuteString[2];
  minuteLabels[4].text = minuteString[1];
  minuteLabels[5].text = minuteString[0];
  let secondString = util.getBinaryString(today.getSeconds(), 6);
  secondLabels[0].text = secondString[5];
  secondLabels[1].text = secondString[4];
  secondLabels[2].text = secondString[3];
  secondLabels[3].text = secondString[2];
  secondLabels[4].text = secondString[1];
  secondLabels[5].text = secondString[0];
  hours = util.zeroPad(hours);
  let mins = util.zeroPad(today.getMinutes());
  let seconds = util.zeroPad(today.getSeconds());
  decimalLabel.text = `${hours}:${mins}:${seconds}`;
}
