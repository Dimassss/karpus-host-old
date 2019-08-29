class HTML_Output__OutputTest extends Test{
  constructor(){
    super();
  }

  run(){
    var counter = 0, passed = 0, results = [];

    this.log("constructor() test:", "header1");
    results[results.length] = this.constr();

    this.log("insertData() test:", "header1");
    results[results.length] = this.insertData();

    this.log("addEditors() test:", "header1");
    results[results.length] = this.addEditors();

    this.log("deleteEditors() test:", "header1");
    results[results.length] = this.deleteEditors();

    this.log("addOutputs() test:", "header1");
    results[results.length] = this.addOutputs();

    this.log("deleteOutputs() test:", "header1");
    results[results.length] = this.deleteOutputs();

    for(var i = 0; i < results.length; i++){
      counter += results[i][0];
      passed += results[i][1];
    }

    return [counter, passed];
  }

  constr(){
    var tests = [];

    tests[tests.length] = [
              new Output({}, []),
              {
                editors: {},
                outputs: {}
              }
            ];

    tests[tests.length] = [
              new Output({"e1": () => {console.log("Editor 1 called")}, "e2": () => {console.log("Editor 2 called")}}, [
                ["aa", "html body .div1", "e1"],
                ["ab", "html body .div2", "e2"],
                ["ba", "html body .div3", "e1"],
                ["bb", "html body .div4", "e2"]
              ]),
              {
                editors: {"e1": () => {console.log("Editor 1 called")}, "e2": () => {console.log("Editor 2 called")}},
                outputs: {
                  "a": {
                    "a": {"css_selector":"html body .div1","editor_name":"e1"},
                    "b": {"css_selector":"html body .div2","editor_name":"e2"}
                  },
                  "b": {
                    "a": {"css_selector":"html body .div3","editor_name":"e1"},
                    "b": {"css_selector":"html body .div4","editor_name":"e2"}
                  }
                }
              }
            ];

    tests[tests.length] = [
              new Output({e1: (a,b) => "HELLO " + a + b, e2: () => 0, note2: function(){return MATH.rand();}},
                        [
                          ["output1", "html body.main output#field1",  "e1"],
                          ["output2", "html body.main output#field2",  "e2"],
                          ["output3", "html body.main output#field3",  "note2"],
                          ["text1", "html body textarea#field1",  "note2"],
                          ["text2", "html body textarea.field2",  "e1"],
                          ["text3", "html body textarea#field3",  "e1"],
                          ["test", "html body.main output#field1",  "e2"],
                          ["into", "html div.into",  "e1"],
                          ["name", "html output.name:not(href)",  "e2"],
                          ["native", "html body.main output#field1",  "note2"],
                          ["terra", "html body.main output#field1",  "e2"]
                        ]),
              {
                editors: {e1: (a,b) => "HELLO " + a + b, e2: () => 0, note2: function(){return MATH.rand();}},
                outputs:{"o":{"u":{"t":{"p":{"u":{"t":{"1":{"css_selector":"html body.main output#field1","editor_name":"e1"},"2":{"css_selector":"html body.main output#field2","editor_name":"e2"},"3":{"css_selector":"html body.main output#field3","editor_name":"note2"}}}}}}},"t":{"e":{"x":{"t":{"1":{"css_selector":"html body textarea#field1","editor_name":"note2"},"2":{"css_selector":"html body textarea.field2","editor_name":"e1"},"3":{"css_selector":"html body textarea#field3","editor_name":"e1"}}},"s":{"t":{"css_selector":"html body.main output#field1","editor_name":"e2"}},"r":{"r":{"a":{"css_selector":"html body.main output#field1","editor_name":"e2"}}}}},"i":{"n":{"t":{"o":{"css_selector":"html div.into","editor_name":"e1"}}}},"n":{"a":{"m":{"e":{"css_selector":"html output.name:not(href)","editor_name":"e2"}},"t":{"i":{"v":{"e":{"css_selector":"html body.main output#field1","editor_name":"note2"}}}}}}}
              }
            ];

    return this.method_check_expect(tests);
  }

  insertData(){
    var f = (a, b) => {
          const r = [];
          r[0] = a;
          r[1] = b;
          return r;
        },
        out = new Output(
          {
            f1: (a, b) => {
              const r = f(a, b);
              r[2] = "f1";
              return r;
            },
            f2: (a, b) => {
              const r = f(a, b);
              r[2] = "f2";
              return r;
            },
            f3: (a, b) => {
              const r = f(a, b);
              r[2] = "f3";
              return r;
            }
          },
          [
            ["aada", "css_selector1",  "f1"],
            ["aaaa", "css_selector2",  "f3"],
            ["acaa", "css_selector3",  "f2"],
            ["abad", "css_selector4",  "f3"],
            ["abaa", "css_selector5",  "f1"]
          ]
        );

    const tests = [
      [out.insertData("aada", "Hello World!"), ["css_selector1","Hello World!","f1"]],
      [out.insertData("aaaa", "Hello World!"), ["css_selector2","Hello World!","f3"]],
      [out.insertData("acaa", "Hello World!"), ["css_selector3","Hello World!","f2"]],
      [out.insertData("abad", "Hello World!"), ["css_selector4","Hello World!","f3"]],
      [out.insertData("abaa", "Hello World!"), ["css_selector5","Hello World!","f1"]]
    ]

    return this.method_check_expect(tests);
  }

  addEditors(){
    var out1 = new Output({
                          "f1": () => 0, "f2": () => 1
                        },
                        {
                          "v1": () => true, "v2": () => false
                        },
                        [
                          ["aa", "html body",  "f1"],
                          ["ab", "html body",  "f2"],
                          ["ba", "html body",  "f1"],
                          ["bb", "html body",  "f2"]
                        ]),
        out2 = new Output({},
                        {
                          "v1": () => true, "v2": () => false
                        },
                        [
                          ["aa", "html body",  "f1"],
                          ["ab", "html body",  "f2"],
                          ["ba", "html body",  "f1"],
                          ["bb", "html body",  "f2"]
                        ]);

    const tests = [
      [out1.getEditors(), {"f1": () => 0, "f2": () => 1}],
      [out2.getEditors(), {}]
    ];

    out1.addEditors({"f2": () => 8, "f4": () => 1});
    out2.addEditors({"f1": () => 0, "f2": () => 1});

    tests[tests.length] = [out1.getEditors(), {"f1": () => 0, "f2": () => 8, "f4": () => 1}];
    tests[tests.length] = [out2.getEditors(), {"f1": () => 0, "f2": () => 1}];

    out1.addEditors({"f3": () => 8, "f4": () => true});
    out2.addEditors({"f3": () => 2, "f2": () => 5});

    tests[tests.length] = [out1.getEditors(), {"f1": () => 0, "f2": () => 8, "f3": () => 8, "f4": () => true}];
    tests[tests.length] = [out2.getEditors(), {"f1": () => 0, "f3": () => 2, "f2": () => 5}];

    return this.method_check_expect(tests);
  }

  deleteEditors(){
    var out = new Output({
                          "f1": () => 0.2, "f2": () => 1, "f3": () => false, "f4": () => "str"
                        },
                        [
                          ["aa", "html body", "f1"],
                          ["ab", "html body", "f2"],
                          ["ba", "html body", "f1"],
                          ["bb", "html body", "f2"]
                        ]);

    const tests = [[out.getEditors(), {"f1": () => 0.2, "f2": () => 1, "f3": () => false, "f4": () => "str"}]];

    out.deleteEditors(["f2", "f4"]);
    tests[tests.length] = [out.getEditors(), {"f1": () => 0.2, "f3": () => false}];

    out.deleteEditors(["f1"]);
    tests[tests.length] = [out.getEditors(), {"f3": () => false}];

    out.deleteEditors(["f3"]);
    tests[tests.length] = [out.getEditors(), {}];

    return this.method_check_expect(tests);
  }

  addOutputs(){
    const out1 = new Output({
                            "f1": () => 0, "f2": () => 1
                          },
                          [
                            ["aa", "html body", "f1"],
                            ["ab", "html body", "f2"]
                          ]),
        out2 = new Output({"f1": () => 0, "f2": () => 1},[]);

    const tests = [
      [out1.getOutputs(), {
                          "a":{
                            "a":{
                              "css_selector":"html body",
                              "editor_name":"f1"
                            },
                            "b":{
                              "css_selector":"html body",
                              "editor_name":"f2"
                            }
                          }
                        }],
      [out2.getOutputs(), {}]
    ];

    out1.addOutputs([["ba", "html body h", "f1"], ["bb", "html body", "f3"]]);
    out2.addOutputs([["ab", "html body", "f2"], ["ba", "html body", "f1"]]);

    tests[tests.length] = [out1.getOutputs(), {
                                "a":{
                                  "a":{
                                    "css_selector":"html body",
                                    "editor_name":"f1"
                                  },
                                  "b":{
                                    "css_selector":"html body",
                                    "editor_name":"f2"
                                  }
                                },
                                "b":{
                                  "a":{
                                    "css_selector":"html body h",
                                    "editor_name":"f1"
                                  },
                                  "b":{
                                    "css_selector":"html body",
                                    "editor_name":"f3"
                                  }
                                }
                              }];
    tests[tests.length] = [out2.getOutputs(), {
                                              "a":{
                                                "b":{
                                                  "css_selector":"html body",
                                                  "editor_name":"f2"
                                                }
                                              },
                                              "b":{
                                                "a":{
                                                  "css_selector":"html body",
                                                  "editor_name":"f1"
                                                }
                                              }
                                            }];

    out1.addOutputs([["cb", "html body",  "f2"], ["bb", "body",  "f2"]]);
    out2.addOutputs([["ba", "html",  "f1"]]);

    tests[tests.length] = [out1.getOutputs(), {
                                              "a":{
                                                "a":{
                                                  "css_selector":"html body",

                                                  "editor_name":"f1"
                                                },
                                                "b":{
                                                  "css_selector":"html body",

                                                  "editor_name":"f2"
                                                }
                                              },
                                              "b":{
                                                "a":{
                                                  "css_selector":"html body h",

                                                  "editor_name":"f1"
                                                },
                                                "b":{
                                                  "css_selector":"body",

                                                  "editor_name":"f2"
                                                }
                                              },
                                              "c":{
                                                "b":{
                                                  "css_selector":"html body",

                                                  "editor_name":"f2"
                                                }
                                              }
                                            }];
    tests[tests.length] = [out2.getOutputs(), {
                                              "a":{
                                                "b":{
                                                  "css_selector":"html body",

                                                  "editor_name":"f2"
                                                }
                                              },
                                              "b":{
                                                "a":{
                                                  "css_selector":"html",

                                                  "editor_name":"f1"
                                                }
                                              }
                                            }];

    return this.method_check_expect(tests);
  }

  deleteOutputs(){
    var out = new Output({
                          "f1": () => 0.2, "f2": () => 1, "f3": () => false, "f4": () => "str"
                        },
                        [
                          ["aaa", "html body",  "f1"],
                          ["aba", "html body",  "f2"],
                          ["baa", "html body",  "f1"],
                          ["bba", "html body",  "f2"]
                        ]);

    const tests = [[out.getOutputs(), {
                                      "a":{
                                        "a":{
                                          "a":{
                                            "css_selector":"html body",

                                            "editor_name":"f1"
                                          }
                                        },
                                        "b":{
                                          "a":{
                                            "css_selector":"html body",

                                            "editor_name":"f2"
                                          }
                                        }
                                      },
                                      "b":{
                                        "a":{
                                          "a":{
                                            "css_selector":"html body",

                                            "editor_name":"f1"
                                          }
                                        },
                                        "b":{
                                          "a":{
                                            "css_selector":"html body",

                                            "editor_name":"f2"
                                          }
                                        }
                                      }
                                    }]];

    out.deleteOutputs(["aaa", "baa"]);
    tests[tests.length] = [out.getOutputs(), {
                                              "a":{
                                                "b":{
                                                  "a":{
                                                    "css_selector":"html body",

                                                    "editor_name":"f2"
                                                  }
                                                }
                                              },
                                              "b":{
                                                "b":{
                                                  "a":{
                                                    "css_selector":"html body",

                                                    "editor_name":"f2"
                                                  }
                                                }
                                              }
                                            }];

    out.deleteOutputs(["bba"]);
    tests[tests.length] = [out.getOutputs(), {
                                              "a":{
                                                "b":{
                                                  "a":{
                                                    "css_selector":"html body",

                                                    "editor_name":"f2"
                                                  }
                                                }
                                              }
                                            }];

    out.deleteOutputs(["aba"]);
    tests[tests.length] = [out.getOutputs(), {}];

    return this.method_check_expect(tests);
  }
}
