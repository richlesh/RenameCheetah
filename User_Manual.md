# RenameCheetah User Manual

**Version:** 1.2.0  
**Product:** RenameCheetah  
**Author:** Richard Lesh / Glowing Cat Software

---

## Table of Contents

1. [Introduction](#introduction)
2. [Main Window Overview](#main-window-overview)
3. [Quick Start](#quick-start)
4. [Rename Scripts](#rename-scripts)
5. [Script Steps](#script-steps)
6. [Loading Files](#loading-files)
7. [Previewing Renames](#previewing-renames)
8. [Renaming Files](#renaming-files)
9. [File Selection and File List Tools](#file-selection-and-file-list-tools)
10. [Inline Rename](#inline-rename)
11. [Sorting and Reordering Files](#sorting-and-reordering-files)
12. [Resizable Panels](#resizable-panels)
13. [Settings](#settings)
14. [Metadata Tools](#metadata-tools)
15. [License Key and Premium Steps](#license-key-and-premium-steps)
16. [Troubleshooting](#troubleshooting)
17. [Privacy and Data Notes](#privacy-and-data-notes)
18. [Keyboard and Mouse Shortcuts](#keyboard-and-mouse-shortcuts)

---

## Introduction

RenameCheetah is a fast, scriptable batch file renaming utility for macOS, Windows, and Linux.

It lets you build reusable rename scripts from ordered steps, load files by drag and drop, preview every new filename before changing anything, and then rename files in bulk.

RenameCheetah is designed around three ideas:

- **Scripts** — reusable rename workflows.
- **Steps** — individual transformations such as Find & Replace, Add Prefix, Add Date/Time, or Convert Case.
- **Live Preview** — a side-by-side view of current filenames and proposed new filenames.

---

## Main Window Overview

The main window has three panels.

### Scripts Panel

The left panel contains your saved rename scripts.

Use this panel to:

- Create scripts.
- Select scripts.
- Rename scripts.
- Duplicate scripts.
- Delete scripts.

Scripts are kept in alphabetical order.

### Steps Panel

The middle panel contains the steps for the selected script.

Use this panel to:

- Add rename steps.
- Delete rename steps.
- Change each step type.
- Edit step options.
- Drag steps into a different order.

Steps are applied from top to bottom.

### Files Panel

The right panel contains the file list and live preview.

It shows:

- **Current Name** — the file's existing name.
- **New Name** — the name that will be produced by the selected script.

The round green play button at the bottom renames files whose new names differ from their current names.

---

## Quick Start

1. Click **+** in the Scripts panel to create a script.
2. Double-click the script name if you want to rename it.
3. Click **+** in the Steps panel to add a step.
4. Choose a step type, such as **Find & Replace** or **Add Prefix**.
5. Configure the step options.
6. Drag files into the Files panel, or use **File → Add Files…**.
7. Review the **Current Name** and **New Name** columns.
8. Click the green rename button to apply the changes.

---

## Rename Scripts

A rename script is a reusable collection of rename steps.

### Creating a Script

Click the **+** button at the bottom of the Scripts panel.

A new script named `Untitled` is created.

### Selecting a Script

Click a script in the Scripts panel. The Steps panel updates to show that script's steps, and the preview updates for the currently loaded files.

### Renaming a Script

1. Select the script.
2. Double-click its name.
3. Type a new name.
4. Press **Enter** or click elsewhere.

Press **Escape** while editing to cancel the name change.

### Duplicating a Script

Select a script and click the duplicate button, shown as `⧉`.

The copy is created with `Copy` appended to the script name.

### Deleting a Script

Select a script and click the **−** button in the Scripts panel.

### Saving Scripts

Scripts are saved automatically:

- On a timer.
- When the app closes.
- When switching scripts.

By default, the autosave interval is configured as 120 seconds.

Scripts are stored in the local RenameCheetah settings file:

```text
~/.renamecheetah-settings.json
```

---

## Script Steps

Steps are the individual operations that transform a filename.

To add a step, click the **+** button in the Steps panel. New steps start as **Find & Replace** steps.

To delete a step, select the step and click the **−** button.

To reorder steps, drag a step card up or down. Because steps run in order, changing the order can change the final filenames.

### Available Step Types

RenameCheetah includes these step types:

- Add Date/Time
- Add Metadata - Audio
- Add Metadata - Photo
- Add Metadata - Video
- Add Prefix
- Add Sequence Number
- Add Suffix
- Add/Replace Hash
- Convert Case
- Find & Replace
- Insert at Position
- Pad Number
- Regular Expression
- Remove Text
- Replace Spaces
- Sanitize
- Swap
- Trim

Some steps are premium steps. See [License Key and Premium Steps](#license-key-and-premium-steps).

---

## Step Reference

### Find & Replace

Finds text and replaces it with other text.

Options:

- **Apply To** — Name Only, Extension Only, or Name and Extension.
- **Find** — text to search for.
- **Replace** — replacement text.
- **Match Case** — only match text with the same capitalization.
- **First Match Only** — replace only the first match instead of all matches.

### Regular Expression

Uses a JavaScript regular expression to replace matching text.

Options:

- **Apply To** — Name Only, Extension Only, or Name and Extension.
- **Pattern** — regular expression pattern.
- **Replace** — replacement text.
- **Match Case** — controls case sensitivity.
- **First Match Only** — replace only the first match instead of all matches.

If the pattern is invalid, RenameCheetah leaves the filename unchanged.

### Remove Text

Removes matching text from the filename name portion.

Options:

- **Remove** — text to remove.
- **Match Case**
- **First Match Only**

### Insert at Position

Inserts text into the filename name portion at a numeric position.

Options:

- **Text** — text to insert.
- **Position** — character position.
- **From End** — counts the position from the end of the filename instead of the beginning.

### Trim

Removes characters from the beginning or end of the filename name portion.

Options:

- **Count** — number of characters to remove.
- **From End** — remove from the end instead of the beginning.

### Swap

Swaps text around the first occurrence of a delimiter.

For example, with delimiter ` - `:

```text
Artist - Song.mp3
```

becomes:

```text
Song - Artist.mp3
```

### Add Prefix

Adds text to the beginning of the filename name portion.

### Add Suffix

Adds text to the end of the filename name portion, before the extension.

### Add Date/Time

Builds a filename from date/time tokens.

Date sources:

- Current date/time
- File created date/time
- File last modified date/time
- EXIF Date/Time Original
- EXIF Date/Time Digitized

Available tokens:

- Filename
- Year
- Month
- Day
- Hour
- Minute
- Second
- AM/PM

Drag tokens into the format field. Click a token in the format field to select it. Right-click supported date/time tokens to choose formatting options.

Example format:

```text
{Year:YYYY}-{Month:MM}-{Day:DD}_{Filename}
```

### Add Metadata - Photo

Builds a filename using photo metadata.

Available tokens:

- Filename
- Width
- Height
- DPI Width
- DPI Height
- Longitude
- Latitude
- Altitude

RenameCheetah can use `exiftool` when available. It also includes a JPEG EXIF fallback for some fields.

### Add Metadata - Audio

Builds a filename using audio metadata.

Available tokens:

- Filename
- Title
- Artist
- Album
- Track
- Year
- Genre

RenameCheetah can use `ffprobe` when available. It also includes a basic MP3 ID3 fallback.

### Add Metadata - Video

Builds a filename using video metadata.

Available tokens:

- Filename
- Width
- Height
- Duration

RenameCheetah can use `ffprobe` when available. It also includes a basic MP4/MOV fallback.

### Add/Replace Hash

Adds, replaces, or removes a hash based on file contents.

Options:

- **Mode** — Add, Replace, or Remove.
- **Algorithm** — MD5, SHA1, or SHA256.
- **Length** — number of hash characters to use.
- **Position** — Prefix, Suffix, or Replace Name.
- **Separator** — text between the hash and the name.

### Add Sequence Number

Adds a sequence number based on the file's current preview order.

Options:

- **Start** — first number.
- **Step** — amount to increment each file.
- **Padding** — minimum number width.
- **Position** — Prefix or Suffix.
- **Separator** — text between the number and the filename.

When this step is used, sorting by **New Name** is disabled because the result depends on file order.

### Pad Number

Pads every number found in the filename name portion to a fixed width.

Example with width `3`:

```text
file-7.txt → file-007.txt
```

### Replace Spaces

Replaces spaces in the filename name portion.

Options:

- Underscore `_`
- Hyphen `-`
- Remove spaces

### Sanitize

Replaces characters that are invalid or unsafe in filenames.

The replacement defaults to `_`.

### Convert Case

Changes capitalization.

Options:

- Lowercase
- Uppercase
- Title Case

Can apply to:

- Name Only
- Extension Only
- Name and Extension

---

## Loading Files

You can load files in several ways.

### Drag and Drop

Drag files into the Files panel. A drop overlay appears when files are over the drop area.

Only files are added. Folders are ignored.

### File Menu

Use:

```text
File → Add Files…
```

or press:

```text
Cmd/Ctrl+O
```

### Duplicate Files

If a file is already in the list, dropping or adding it again does not add a duplicate entry.

### Clear on Drop

In Settings, you can enable **Clear file list on drag and drop**.

When enabled, dropping new files replaces the current file list. Hold **Shift** while dropping to temporarily invert that behavior.

---

## Previewing Renames

RenameCheetah previews every rename before changing files.

The Files panel shows:

- **Current Name** — existing filename.
- **New Name** — proposed filename.

Changed new names are highlighted.

The status bar shows how many files will be renamed.

Example:

```text
12 of 20 files to be renamed
```

If no files are loaded, the status says:

```text
Drop files to begin
```

### Collision Avoidance

RenameCheetah checks for duplicate output names and existing files in the same directory. If a proposed name would collide, RenameCheetah appends a numeric suffix such as `-1`, `-2`, and so on.

---

## Renaming Files

After reviewing the preview, click the green rename button in the status bar.

RenameCheetah renames only files whose new names differ from their current names.

After the rename completes, the file list updates to show the new names as the current names.

If an error occurs, RenameCheetah shows an error message.

> **Important:** Always review the New Name column before clicking the rename button. RenameCheetah performs real filesystem renames.

---

## File Selection and File List Tools

### Select a File

Click a file row.

### Multi-Select

Use:

- **Cmd/Ctrl-click** to toggle individual files.
- **Shift-click** to select a range.

### Remove Selected Files

Use one of these methods:

- Press **Delete** or **Backspace**.
- Right-click a selected file and choose **Remove File**.
- Use **File → Remove File**.

Removing a file from the list does not delete it from disk.

### Clear the File List

Use:

```text
File → Clear Files
```

or right-click the empty area of the Files panel and choose **Clear Files**.

---

## Inline Rename

You can rename a single file immediately without using a script.

1. Double-click a filename in the **Current Name** column.
2. Edit the name.
3. Press **Enter** or click elsewhere to commit.

Press **Escape** to cancel.

Inline rename changes the file on disk immediately.

---

## Sorting and Reordering Files

### Sort by Current Name

Click the **Current Name** column header.

Click again to reverse the sort direction.

### Sort by New Name

Click the **New Name** column header.

Click again to reverse the sort direction.

Sorting by New Name is disabled when the selected script contains an **Add Sequence Number** step, because sequence numbers depend on the display order.

### Manual Reordering

Drag rows in the Files panel to manually reorder files. This is especially useful when using sequence numbers.

---

## Resizable Panels

The panel dividers can be dragged to resize the Scripts, Steps, and Files panels.

RenameCheetah saves panel widths between sessions.

You can also drag the divider between the Current Name and New Name columns to adjust the preview column width.

The app also saves the main window size and position.

---

## Settings

Open **Settings…** from the application menu.

Settings include:

- **Clear file list on drag and drop**
- **Script Highlight** color
- **Step Highlight** color
- **File Highlight** color
- **ffprobe Executable Path**
- **exiftool Executable Path**

Settings are saved locally in:

```text
~/.renamecheetah-settings.json
```

### ffprobe Path

`ffprobe` is used to read audio and video metadata when available.

Leave the field blank to let RenameCheetah auto-detect it, or browse to the executable manually.

Common locations are checked automatically on macOS, Windows, and Linux.

### exiftool Path

`exiftool` is used to read photo metadata when available.

Leave the field blank to let RenameCheetah auto-detect it, or browse to the executable manually.

---

## Metadata Tools

Metadata rename steps work best when optional helper tools are installed.

### ffprobe

Used for:

- Audio metadata
- Video metadata

Without `ffprobe`, RenameCheetah still has limited fallback support:

- Basic MP3 ID3 tags for audio.
- Basic MP4/MOV metadata for video.

### exiftool

Used for:

- Photo metadata
- GPS metadata
- Image dimensions and DPI metadata across many formats

Without `exiftool`, RenameCheetah still has limited JPEG EXIF fallback support.

---

## License Key and Premium Steps

RenameCheetah includes a license key system.

Open **License Key…** from the application menu to enter:

- Your email address
- Your license key

License information is saved locally in the settings file.

### Premium Steps

The following steps require a valid license:

- Add Metadata - Audio
- Add Metadata - Photo
- Add Metadata - Video
- Regular Expression

If RenameCheetah is not licensed, premium step controls are disabled and premium steps are skipped during preview and rename.

### Donation Reminder

If no valid license is configured, RenameCheetah may occasionally show a donation reminder splash screen. The splash closes when clicked or after a short delay.

---

## Troubleshooting

### The rename button is disabled

The rename button is enabled only when at least one file's New Name differs from its Current Name.

Check that:

- Files are loaded.
- A script is selected.
- The script has steps.
- The steps actually change the filenames.

### My metadata fields are blank

Install or configure the relevant helper tool:

- Use `ffprobe` for audio and video metadata.
- Use `exiftool` for photo metadata.

Also make sure the files actually contain the requested metadata.

### A premium step is grayed out

Enter a valid license key using **License Key…** from the application menu.

### Files were not added when dropped

RenameCheetah only adds files. Folders are ignored.

### Sorting by New Name is disabled

The selected script likely contains an **Add Sequence Number** step. Use manual row ordering or sort by Current Name instead.

### Rename failed

Possible causes include:

- File is open in another application.
- File permissions prevent renaming.
- Destination name is invalid for the operating system.
- Destination file already exists and cannot be safely renamed.
- File is on a read-only volume.

### I accidentally removed a file from the list

Removing a file from the RenameCheetah list does not delete it from disk. Add it again using drag and drop or **File → Add Files…**.

---

## Privacy and Data Notes

RenameCheetah works locally on your computer.

The app stores scripts, settings, panel sizes, window position, and license information in:

```text
~/.renamecheetah-settings.json
```

RenameCheetah does not need to upload your files to rename them.

Metadata helper tools such as `ffprobe` and `exiftool`, if installed, run locally on your machine.

---

## Keyboard and Mouse Shortcuts

| Shortcut / Action | Result |
|---|---|
| **Cmd/Ctrl+O** | Add files |
| **Delete** or **Backspace** | Remove selected files from the list |
| **Double-click script name** | Rename selected script |
| **Double-click current filename** | Rename that file immediately |
| **Cmd/Ctrl-click file row** | Toggle file selection |
| **Shift-click file row** | Select a range |
| **Drag step card** | Reorder script steps |
| **Drag file row** | Manually reorder files |
| **Click column header** | Sort file list |
| **Right-click file row** | Show file context menu |
| **Right-click empty file area** | Show add/clear context menu |
| **Enter while editing** | Commit edit |
| **Escape while editing** | Cancel edit |

---

## Best Practices

- Always review the New Name column before renaming.
- Test new scripts on a small group of files first.
- Use duplicate scripts before making major changes to an existing workflow.
- Use sequence numbers after sorting or manually ordering files.
- Keep metadata tools installed if you rely on audio, photo, or video metadata.
- Use the Sanitize step when creating filenames for cross-platform use.
