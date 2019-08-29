class HTML_Input__InputTest extends Test{
  constructor(){
    super();
  }

  run(){
    var counter = 0, passed = 0, results = [];

    this.log("constructor() test:", "header1");
    results[results.length] = this.constr();

    this.log("takeData() test:", "header1");
    results[results.length] = this.takeData();

    this.log("addTakes() test:", "header1");
    results[results.length] = this.addTakes();

    this.log("deleteTakes() test:", "header1");
    results[results.length] = this.deleteTakes();

    this.log("addValidators() test:", "header1");
    results[results.length] = this.addValidators();

    this.log("deleteValidators() test:", "header1");
    results[results.length] = this.deleteValidators();

    this.log("addInputs() test:", "header1");
    results[results.length] = this.addInputs();

    this.log("deleteInputs() test:", "header1");
    results[results.length] = this.deleteInputs();

    for(var i = 0; i < results.length; i++){
      counter += results[i][0];
      passed += results[i][1];
    }

    return [counter, passed];
  }

  constr(){
    var tests = [];

    tests[tests.length] = [
              new Input({}, {}, []),
              {
                takes: {},
                validators: {},
                inputs: {}
              }
            ];

    tests[tests.length] = [
              new Input({"f1": () => 0, "f2": () => 1}, {"v1": () => true, "v2": () => false}, [
                ["aa", "html body", "v1", "f1"],
                ["ab", "html body", "v2", "f2"],
                ["ba", "html body", "v1", "f1"],
                ["bb", "html body", "v2", "f2"]
              ]),
              {
                takes: {"f1": () => 0, "f2": () => 1},
                validators: {"v1": () => true, "v2": () => false},
                inputs: {
                  "a": {
                    "a": {"css_selector":"html body","validator_name":"v1","take_name":"f1"},
                    "b": {"css_selector":"html body","validator_name":"v2","take_name":"f2"}
                  },
                  "b": {
                    "a": {"css_selector":"html body","validator_name":"v1","take_name":"f1"},
                    "b": {"css_selector":"html body","validator_name":"v2","take_name":"f2"}
                  }
                }
              }
            ];

    tests[tests.length] = [
              new Input({f1: (a,b) => "HELLO " + a + b, f2: () => 0, notf2: function(){return MATH.rand();}},
                        {validator1: (str) => str.length > 10},
                        [
                          ["input1", "html body.main input#field1", "validator1", "f1"],
                          ["input2", "html body.main input#field2", "validator1", "f2"],
                          ["input3", "html body.main input#field3", "validator1", "notf2"],
                          ["text1", "html body textarea#field1", "validator1", "notf2"],
                          ["text2", "html body textarea.field2", "validator1", "f1"],
                          ["text3", "html body textarea#field3", "validator1", "f1"],
                          ["test", "html body.main input#field1", "validator1", "f2"],
                          ["into", "html div.into", "validator1", "f1"],
                          ["name", "html input.name:not(href)", "validator1", "f2"],
                          ["native", "html body.main input#field1", "validator1", "notf2"],
                          ["terra", "html body.main input#field1", "validator1", "f2"]
                        ]),
              {
                takes: {f1: (a,b) => "HELLO " + a + b, f2: () => 0, notf2: function(){return MATH.rand();}},
                validators: {validator1: (str) => str.length > 10},
                inputs: {"i":{"n":{"p":{"u":{"t":{"1":{"css_selector":"html body.main input#field1","validator_name":"validator1","take_name":"f1"},"2":{"css_selector":"html body.main input#field2","validator_name":"validator1","take_name":"f2"},"3":{"css_selector":"html body.main input#field3","validator_name":"validator1","take_name":"notf2"}}}},"t":{"o":{"css_selector":"html div.into","validator_name":"validator1","take_name":"f1"}}}},"t":{"e":{"x":{"t":{"1":{"css_selector":"html body textarea#field1","validator_name":"validator1","take_name":"notf2"},"2":{"css_selector":"html body textarea.field2","validator_name":"validator1","take_name":"f1"},"3":{"css_selector":"html body textarea#field3","validator_name":"validator1","take_name":"f1"}}},"s":{"t":{"css_selector":"html body.main input#field1","validator_name":"validator1","take_name":"f2"}},"r":{"r":{"a":{"css_selector":"html body.main input#field1","validator_name":"validator1","take_name":"f2"}}}}},"n":{"a":{"m":{"e":{"css_selector":"html input.name:not(href)","validator_name":"validator1","take_name":"f2"}},"t":{"i":{"v":{"e":{"css_selector":"html body.main input#field1","validator_name":"validator1","take_name":"notf2"}}}}}}}
              }
            ];

    return this.method_check_expect(tests);
  }

  takeData(){
    var f = (a, b, c) => {
          const r = [];
          r[0] = a;
          r[1] = c("<script>alert(\"Hell`o 'Wolrd'``!\");</script> <p>&<>'\"'</p>");
          r[2] = b(r[1]);
          return r;
        },
        inp = new Input(
          {
            f1: (a, b, c) => {
              const r = f(a, b, c);
              r[3] = "f1";
              return r;
            },
            f2: (a, b, c) => {
              const r = f(a, b, c);
              r[3] = "f2";
              return r;
            },
            f3: (a, b, c) => {
              const r = f(a, b, c);
              r[3] = "f3";
              return r;
            }
          },
          {
            v1: (a) => true,
            v2: (a) => a.length > 10,
            v3: (a) => a.length <= 10
          },
          [
            ["aada", "css_selector1", "v1", "f1"],
            ["aaaa", "css_selector2", "v2", "f3"],
            ["acaa", "css_selector3", "v3", "f2"],
            ["abad", "css_selector4", "v1", "f3"],
            ["abaa", "css_selector5", "v2", "f1"]
          ]
        );

    const tests = [
      [inp.takeData("aada"), ["css_selector1","&lt;script&gt;alert(&quot;Hell`o &apos;Wolrd&apos;``!&quot;);&lt;/script&gt; &lt;p&gt;&amp;&lt;&gt;&apos;&quot;&apos;&lt;/p&gt;",true,"f1"]],
      [inp.takeData("aaaa"), ["css_selector2","&lt;script&gt;alert(&quot;Hell`o &apos;Wolrd&apos;``!&quot;);&lt;/script&gt; &lt;p&gt;&amp;&lt;&gt;&apos;&quot;&apos;&lt;/p&gt;",true,"f3"]],
      [inp.takeData("acaa"), ["css_selector3","&lt;script&gt;alert(&quot;Hell`o &apos;Wolrd&apos;``!&quot;);&lt;/script&gt; &lt;p&gt;&amp;&lt;&gt;&apos;&quot;&apos;&lt;/p&gt;",false,"f2"]],
      [inp.takeData("abad"), ["css_selector4","&lt;script&gt;alert(&quot;Hell`o &apos;Wolrd&apos;``!&quot;);&lt;/script&gt; &lt;p&gt;&amp;&lt;&gt;&apos;&quot;&apos;&lt;/p&gt;",true,"f3"]],
      [inp.takeData("abaa"), ["css_selector5","&lt;script&gt;alert(&quot;Hell`o &apos;Wolrd&apos;``!&quot;);&lt;/script&gt; &lt;p&gt;&amp;&lt;&gt;&apos;&quot;&apos;&lt;/p&gt;",true,"f1"]]
    ]

    return this.method_check_expect(tests);
  }

  addTakes(){
    var inp1 = new Input({
                          "f1": () => 0, "f2": () => 1
                        },
                        {
                          "v1": () => true, "v2": () => false
                        },
                        [
                          ["aa", "html body", "v1", "f1"],
                          ["ab", "html body", "v2", "f2"],
                          ["ba", "html body", "v1", "f1"],
                          ["bb", "html body", "v2", "f2"]
                        ]),
        inp2 = new Input({},
                        {
                          "v1": () => true, "v2": () => false
                        },
                        [
                          ["aa", "html body", "v1", "f1"],
                          ["ab", "html body", "v2", "f2"],
                          ["ba", "html body", "v1", "f1"],
                          ["bb", "html body", "v2", "f2"]
                        ]);

    const tests = [
      [inp1.getTakes(), {"f1": () => 0, "f2": () => 1}],
      [inp2.getTakes(), {}]
    ];

    inp1.addTakes({"f2": () => 8, "f4": () => 1});
    inp2.addTakes({"f1": () => 0, "f2": () => 1});

    tests[tests.length] = [inp1.getTakes(), {"f1": () => 0, "f2": () => 8, "f4": () => 1}];
    tests[tests.length] = [inp2.getTakes(), {"f1": () => 0, "f2": () => 1}];

    inp1.addTakes({"f3": () => 8, "f4": () => true});
    inp2.addTakes({"f3": () => 2, "f2": () => 5});

    tests[tests.length] = [inp1.getTakes(), {"f1": () => 0, "f2": () => 8, "f3": () => 8, "f4": () => true}];
    tests[tests.length] = [inp2.getTakes(), {"f1": () => 0, "f3": () => 2, "f2": () => 5}];

    return this.method_check_expect(tests);
  }

  deleteTakes(){
    var inp = new Input({
                          "f1": () => 0.2, "f2": () => 1, "f3": () => false, "f4": () => "str"
                        },
                        {
                          "v1": () => true, "v2": () => false
                        },
                        [
                          ["aa", "html body", "v1", "f1"],
                          ["ab", "html body", "v2", "f2"],
                          ["ba", "html body", "v1", "f1"],
                          ["bb", "html body", "v2", "f2"]
                        ]);

    const tests = [[inp.getTakes(), {"f1": () => 0.2, "f2": () => 1, "f3": () => false, "f4": () => "str"}]];

    inp.deleteTakes(["f2", "f4"]);
    tests[tests.length] = [inp.getTakes(), {"f1": () => 0.2, "f3": () => false}];

    inp.deleteTakes(["f1"]);
    tests[tests.length] = [inp.getTakes(), {"f3": () => false}];

    inp.deleteTakes(["f3"]);
    tests[tests.length] = [inp.getTakes(), {}];

    return this.method_check_expect(tests);
  }

  addValidators(){
    var inp1 = new Input({
                          "f1": () => 0, "f2": () => 1
                        },
                        {
                          "v1": () => true, "v2": () => false
                        },
                        [
                          ["aa", "html body", "v1", "f1"],
                          ["ab", "html body", "v2", "f2"],
                          ["ba", "html body", "v1", "f1"],
                          ["bb", "html body", "v2", "f2"]
                        ]),
        inp2 = new Input({"f1": () => 0, "f2": () => 1},
                        {},
                        [
                          ["aa", "html body", "v1", "f1"],
                          ["ab", "html body", "v2", "f2"],
                          ["ba", "html body", "v1", "f1"],
                          ["bb", "html body", "v2", "f2"]
                        ]);

    const tests = [
      [inp1.getValidators(), {"v1": () => true, "v2": () => false}],
      [inp2.getValidators(), {}]
    ];

    inp1.addValidators({"v2": () => true, "v4": () => true});
    inp2.addValidators({"v1": () => false, "v2": () => false});

    tests[tests.length] = [inp1.getValidators(), {"v1": () => true, "v2": () => true, "v4": () => true}];
    tests[tests.length] = [inp2.getValidators(), {"v1": () => false, "v2": () => false}];

    inp1.addValidators({"v3": () => false, "v4": () => true});
    inp2.addValidators({"v3": () => true, "v2": () => true});

    tests[tests.length] = [inp1.getValidators(), {"v1": () => true, "v2": () => true, "v3": () => false, "v4": () => true}];
    tests[tests.length] = [inp2.getValidators(), {"v1": () => false, "v2": () => true, "v3": () => true}];

    return this.method_check_expect(tests);
  }

  deleteValidators(){
    var inp = new Input({
                          "f1": () => 0.2, "f2": () => 1, "f3": () => false, "f4": () => "str"
                        },
                        {
                          "v1": () => true, "v2": () => false, "v3": () => false, "v4": () => true
                        },
                        [
                          ["aa", "html body", "v1", "f1"],
                          ["ab", "html body", "v2", "f2"],
                          ["ba", "html body", "v1", "f1"],
                          ["bb", "html body", "v2", "f2"]
                        ]);

    const tests = [[inp.getValidators(), {"v1": () => true, "v2": () => false, "v3": () => false, "v4": () => true}]];

    inp.deleteValidators(["v2", "v4"]);
    tests[tests.length] = [inp.getValidators(), {"v1": () => true, "v3": () => false}];

    inp.deleteValidators(["v1"]);
    tests[tests.length] = [inp.getValidators(), {"v3": () => false}];

    inp.deleteValidators(["v3"]);
    tests[tests.length] = [inp.getValidators(), {}];

    return this.method_check_expect(tests);
  }

  addInputs(){
    const inp1 = new Input({
                            "f1": () => 0, "f2": () => 1
                          },
                          {
                            "v1": () => true, "v2": () => false
                          },
                          [
                            ["aa", "html body", "v1", "f1"],
                            ["ab", "html body", "v2", "f2"]
                          ]),
        inp2 = new Input({"f1": () => 0, "f2": () => 1},
                        {
                          "v1": () => true, "v2": () => false
                        },
                        []);

    const tests = [
      [inp1.getInputs(), {
                          "a":{
                            "a":{
                              "css_selector":"html body",
                              "validator_name":"v1",
                              "take_name":"f1"
                            },
                            "b":{
                              "css_selector":"html body",
                              "validator_name":"v2",
                              "take_name":"f2"
                            }
                          }
                        }],
      [inp2.getInputs(), {}]
    ];

    inp1.addInputs([["ba", "html body h", "v1", "f1"], ["bb", "html body", "v2", "f3"]]);
    inp2.addInputs([["ab", "html body", "v2", "f2"], ["ba", "html body", "v1", "f1"]]);

    tests[tests.length] = [inp1.getInputs(), {
                                "a":{
                                  "a":{
                                    "css_selector":"html body",
                                    "validator_name":"v1",
                                    "take_name":"f1"
                                  },
                                  "b":{
                                    "css_selector":"html body",
                                    "validator_name":"v2",
                                    "take_name":"f2"
                                  }
                                },
                                "b":{
                                  "a":{
                                    "css_selector":"html body h",
                                    "validator_name":"v1",
                                    "take_name":"f1"
                                  },
                                  "b":{
                                    "css_selector":"html body",
                                    "validator_name":"v2",
                                    "take_name":"f3"
                                  }
                                }
                              }];
    tests[tests.length] = [inp2.getInputs(), {
                                              "a":{
                                                "b":{
                                                  "css_selector":"html body",
                                                  "validator_name":"v2",
                                                  "take_name":"f2"
                                                }
                                              },
                                              "b":{
                                                "a":{
                                                  "css_selector":"html body",
                                                  "validator_name":"v1",
                                                  "take_name":"f1"
                                                }
                                              }
                                            }];

    inp1.addInputs([["cb", "html body", "v2", "f2"], ["bb", "body", "v2", "f2"]]);
    inp2.addInputs([["ba", "html", "v1", "f1"]]);

    tests[tests.length] = [inp1.getInputs(), {
                                              "a":{
                                                "a":{
                                                  "css_selector":"html body",
                                                  "validator_name":"v1",
                                                  "take_name":"f1"
                                                },
                                                "b":{
                                                  "css_selector":"html body",
                                                  "validator_name":"v2",
                                                  "take_name":"f2"
                                                }
                                              },
                                              "b":{
                                                "a":{
                                                  "css_selector":"html body h",
                                                  "validator_name":"v1",
                                                  "take_name":"f1"
                                                },
                                                "b":{
                                                  "css_selector":"body",
                                                  "validator_name":"v2",
                                                  "take_name":"f2"
                                                }
                                              },
                                              "c":{
                                                "b":{
                                                  "css_selector":"html body",
                                                  "validator_name":"v2",
                                                  "take_name":"f2"
                                                }
                                              }
                                            }];
    tests[tests.length] = [inp2.getInputs(), {
                                              "a":{
                                                "b":{
                                                  "css_selector":"html body",
                                                  "validator_name":"v2",
                                                  "take_name":"f2"
                                                }
                                              },
                                              "b":{
                                                "a":{
                                                  "css_selector":"html",
                                                  "validator_name":"v1",
                                                  "take_name":"f1"
                                                }
                                              }
                                            }];

    return this.method_check_expect(tests);
  }

  deleteInputs(){
    var inp = new Input({
                          "f1": () => 0.2, "f2": () => 1, "f3": () => false, "f4": () => "str"
                        },
                        {
                          "v1": () => true, "v2": () => false, "v3": () => false, "v4": () => true
                        },
                        [
                          ["aaa", "html body", "v1", "f1"],
                          ["aba", "html body", "v2", "f2"],
                          ["baa", "html body", "v1", "f1"],
                          ["bba", "html body", "v2", "f2"]
                        ]);

    const tests = [[inp.getInputs(), {
                                      "a":{
                                        "a":{
                                          "a":{
                                            "css_selector":"html body",
                                            "validator_name":"v1",
                                            "take_name":"f1"
                                          }
                                        },
                                        "b":{
                                          "a":{
                                            "css_selector":"html body",
                                            "validator_name":"v2",
                                            "take_name":"f2"
                                          }
                                        }
                                      },
                                      "b":{
                                        "a":{
                                          "a":{
                                            "css_selector":"html body",
                                            "validator_name":"v1",
                                            "take_name":"f1"
                                          }
                                        },
                                        "b":{
                                          "a":{
                                            "css_selector":"html body",
                                            "validator_name":"v2",
                                            "take_name":"f2"
                                          }
                                        }
                                      }
                                    }]];

    inp.deleteInputs(["aaa", "baa"]);
    tests[tests.length] = [inp.getInputs(), {
                                              "a":{
                                                "b":{
                                                  "a":{
                                                    "css_selector":"html body",
                                                    "validator_name":"v2",
                                                    "take_name":"f2"
                                                  }
                                                }
                                              },
                                              "b":{
                                                "b":{
                                                  "a":{
                                                    "css_selector":"html body",
                                                    "validator_name":"v2",
                                                    "take_name":"f2"
                                                  }
                                                }
                                              }
                                            }];

    inp.deleteInputs(["bba"]);
    tests[tests.length] = [inp.getInputs(), {
                                              "a":{
                                                "b":{
                                                  "a":{
                                                    "css_selector":"html body",
                                                    "validator_name":"v2",
                                                    "take_name":"f2"
                                                  }
                                                }
                                              }
                                            }];

    inp.deleteInputs(["aba"]);
    tests[tests.length] = [inp.getInputs(), {}];

    return this.method_check_expect(tests);
  }
}
