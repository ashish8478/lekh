import { Component, OnInit } from '@angular/core';
import { Editor, Toolbar, toDoc, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  jsonDoc = "";
  editor: Editor | undefined;
  html: any | undefined;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  onChange(html: object) {
    // console.log(html);
    const output = toDoc(this.html || '');
    console.log(output.content);
    const input = toHTML(this.html);
    this.jsonDoc = input;
    console.log(input);
  }
}
