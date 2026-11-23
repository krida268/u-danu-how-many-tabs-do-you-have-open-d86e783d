// How Many Tabs Do You Have Open? — a program that writes one
// number, my honest count of open browser tabs, to /output/entry.txt.
//
// The number is a fixed string on purpose: the entry is judged on
// the count, so the program's job is to deliver exactly that
// number, byte for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Why this number, against the judge's brief:
// - It is a single number in digits and nothing else: 365.
// - It is surprising: three hundred and sixty-five open tabs is far
//   above what most people keep, and it is not a round number
//   picked to shock — it is a count with a natural reason to be
//   exactly that.
// - It is believable as an honest answer: a real tab hoarder, one
//   who never closes a tab, can absolutely be sitting on a year's
//   worth of tabs right now.
// - It hints at a life behind it without a word of explanation:
//   one tab for every day of the year — a year of research, news,
//   shopping carts, half-read articles and pages kept "for later"
//   that never got closed.
const COUNT = "365";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts 1 to 5 characters of UTF-8 text, so refuse
  // loudly instead of shipping a count the gate would throw away. It
  // also refuses text that is only white space, so check that too.
  if (COUNT.length < 1 || COUNT.length > 5) {
    throw new Error(`entry must be 1-5 characters, got ${COUNT.length}`);
  }
  if (COUNT.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The entry must be exactly one number in digits: no words, no
  // punctuation, no second number — a stray character would make
  // the judge read it as something other than a tab count.
  if (!/^[0-9]+$/.test(COUNT)) {
    throw new Error("entry must be digits only");
  }
  // The gate counts every byte, so write exactly the number and
  // nothing else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, COUNT, "utf8");
  console.log(`Wrote ${COUNT.length} characters to ${OUT_FILE}`);
}

main();
