import { Component, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar, toDoc, toHTML } from 'ngx-editor';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  jsonDoc = {
    type: "doc",
    content: []
  };

  output = {
    title: "",
    author: "",
    source: "",
    publisher: "",
    date: "",
    description: "",
    keywords: "",
    editorContent: ""
  };

  editor: Editor | undefined;
  html: any | undefined;

  form: FormGroup | undefined;

  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.jsonDoc = JSON.parse(lekh.lekh);
    this.editor = new Editor();

    this.form = this.fb.group({
      title: new FormControl('', [Validators.required(), Validators.minLength(4)]),
      author: new FormControl('प. पू. डॉ. काका', [Validators.required(), Validators.minLength(4)]),
      source: new FormControl(''),
      publisher: new FormControl(''),
      date: new FormControl(''),
      description: new FormControl(''),
      keywords: new FormControl(''),
      editorContent: new FormControl(this.jsonDoc, Validators.required()),
    })
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  // onChange(html: object) {
  //   // console.log(html);
  //   // const output = toDoc(this.html || '');
  //   // console.log(output.content);

  //   const input = toHTML(this.jsonDoc);
  //   // this.jsonDoc = output.content;
  //   this.html = input;
  //   console.log(JSON.stringify(JSON.stringify(this.jsonDoc)));
  // }
  
  saveLekh() {
    const content = this.form?.get('editorContent')?.value;
    const input = toHTML(content);
    this.html = input;

    this.output.title = this.form?.get('title')?.value;
    this.output.author = this.form?.get('author')?.value;
    this.output.source = this.form?.get('source')?.value;
    this.output.publisher = this.form?.get('publisher')?.value;
    this.output.date = this.form?.get('date')?.value;
    this.output.description = this.form?.get('description')?.value;
    this.output.keywords = this.form?.get('keywords')?.value;
    this.output.editorContent = JSON.stringify(content);

    this.html = JSON.stringify(this.output);
  }
}
