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
    grantha: "",
    publisher: "",
    category: "",
    previousLekhInSeries: "",
    nextLekhInSeries: "",
    date: "",
    description: "",
    keywords: [""],
    editorContent: ""
  };

  editor: Editor | undefined;
  html: any | undefined;
  outputJson: any;
  outputHtml: any;
  activeTab = 'myform';

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
      author: new FormControl('डॉ. श्री. द. देशमुख', [Validators.required(), Validators.minLength(4)]),
      source: new FormControl(''),
      grantha: new FormControl(''),
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
    
    this.switchTab('home');
   
    const content = this.form?.get('editorContent')?.value;
    const input = toHTML(content);
    this.html = input;

    this.output.title = this.form?.get('title')?.value;
    this.output.author = this.form?.get('author')?.value;
    this.output.source = this.form?.get('source')?.value;
    this.output.publisher = "";
    this.output.grantha = this.form?.get('grantha')?.value;
    this.output.date = this.form?.get('date')?.value;
    this.output.description = this.form?.get('description')?.value;
    this.output.keywords = this.form?.get('keywords')?.value?.toString().split(",").map((k: string) => k.trim());

    this.output.editorContent = this.html;

    this.outputJson =  JSON.stringify(this.output);

    this.outputHtml = input;
  }

  onChangeEvent($event: any) {
    this.outputHtml = $event.target.value;
    // this.outputJson = JSON.stringify(toDoc(this.outputHtml));

    this.output.editorContent = this.html;

    this.outputJson = JSON.stringify(this.output);
    // this.outputJson = JSON.stringify(JSON.stringify(toDoc(this.outputHtml)));
  }

  copyJsonOutput(inputElement: any) {
    let text: string = inputElement.innerHTML;
    text = text.trim();
    if (text.startsWith("\"") && text.endsWith("\"")) {
      text = text.slice(1, text.length - 1);
    }
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyHtmlEdits(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    this.output.editorContent = this.html;

    this.outputJson =  JSON.stringify(this.output);
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    console.log("Current Tab: " + tab);
  }
}
