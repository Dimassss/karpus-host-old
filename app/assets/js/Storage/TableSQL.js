class TableSQL{constructor(s,t,e){this.k=s,this.table=t,this.v=e}l(s,t){$.post("/crm/load",{keys:s,table:this.table,k:this.k}).done(s=>{t(JSON.parse(s))})}save(s,t){$.post("/crm/save",{records:s),table:this.table,k:this.k,v:this.v}).done(s=>{t(JSON.parse(s))})}del(s){$.post("/crm/del",{keys:s,table:this.table,k:this.k})}sl(s,t,e){$.post("/crm/select",{where:s,table:this.table,data:t}).done(s=>{e(JSON.parse(s))})}}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0b3JhZ2UvVGFibGVTUUwuanMiXSwibmFtZXMiOlsiVGFibGVTUUwiLCJbb2JqZWN0IE9iamVjdF0iLCJrIiwidGFibGUiLCJ2IiwidGhpcyIsImtleXMiLCJjYiIsIiQiLCJwb3N0IiwiZG9uZSIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJyZWNvcmRzIiwid2hlcmUiXSwibWFwcGluZ3MiOiJBQXlCQSxNQUFNQSxTQUNKQyxZQUFZQyxFQUFHQyxFQUFPQyxHQUNSQyxLQUNOSCxFQUFJQSxFQURFRyxLQUVORixNQUFRQSxFQUZGRSxLQUdORCxFQUFJQSxFQWdEWkgsRUFBRUssRUFBTUMsR0FHTkMsRUFBRUMsS0FBSyxZQUFhLENBQUNILEtBQUtBLEVBQU1ILE1BRnBCRSxLQUVpQ0YsTUFBT0QsRUFGeENHLEtBRWlESCxJQUFJUSxLQUFNQyxJQUNyRUosRUFBR0ssS0FBS0MsTUFBTUYsTUEyRGxCVixLQUFLYSxFQUFTUCxHQUdaQyxFQUFFQyxLQUFLLFlBQWEsQ0FBQ0ssUUFBU0EsRUFBU1gsTUFGM0JFLEtBRXdDRixNQUFPRCxFQUYvQ0csS0FFd0RILEVBQUdFLEVBRjNEQyxLQUVvRUQsSUFBSU0sS0FBTUMsSUFDeEZKLEVBQUdLLEtBQUtDLE1BQU1GLE1BYWxCVixJQUFJSyxHQUdGRSxFQUFFQyxLQUFLLFdBQVksQ0FBQ0gsS0FBTUEsRUFBTUgsTUFGcEJFLEtBRWlDRixNQUFPRCxFQUZ4Q0csS0FFaURILElBbUIvREQsR0FBR2MsRUFBT0osRUFBTUosR0FHZEMsRUFBRUMsS0FBSyxjQUFlLENBQUNNLE1BQU9BLEVBQU9aLE1BRnpCRSxLQUVzQ0YsTUFBT1EsS0FBTUEsSUFBT0QsS0FBTUMsSUFDMUVKLEVBQUdLLEtBQUtDLE1BQU1GIiwiZmlsZSI6IlN0b3JhZ2UvVGFibGVTUUwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuQGNsYXNzIFRhYmxlU1FMLCBwYXJlbnRcclxuQHBhcmFtc1xyXG4gIEBwYXJhbSB7U3RyaW5nfSBrID0+IGNvbHVtbk5hbWUgb2YgcHJpbWFyeUtleS4gRXhhbXBsZTogayA9IFwiaWRcIlxyXG4gIEBwYXJhbSB7U3RyaW5nfSB0YWJsZSA9PiB0YWJsZSBuYW1lIG9mIGN1cnJlbnQgb2JqZWN0IGluIGRiLiBFeGFtcGxlOiB0YWJsZSA9IFwiY3VzdG9tZXJzXCJcclxuICBAcGFyYW0ge09iamVjdH0gdiA9PiBIYXNoTWFwIG9mIGNvbHVtbiBuYW1lcyBpbiBvYmplY3QgYW5kIHNxbCBzdHJpbmcgdG8gY3JlYXRlIHRoaXMgY29sdW1uLiBFeGFtcGxlOiB2ID0ge25hbWU6IFwiXHRgbmFtZWAgVkFSQ0hBUig4MCkgTk9UIE5VTExcIn1cclxuICAgICAgICAgICAgICAgICAgdiA9IHtjb2x1bW5OYW1lOiBzcWxTdHJpbmd9XHJcbkBtZXRob2RzXHJcbiAgQG1ldGhvZCBsXHJcbiAgICBAcGFyYW0ge0FycmF5fSBrZXlzID0+IGFycmF5IG9mIHByaW1hcnkga2V5cyBpbiBvYmplY3RcclxuICAgIEBkbyBkZWxldGUgY3VycmVudCBvYmplY3QgZnJvbSBkYlxyXG4gICAgQHJldHVybiB7QXJyYXk8T2JqZWN0Pn0gPT4gYXJyYXkgb2Ygb2JqZWN0IGZyb20gZGJcclxuICBAbWV0aG9kIHNhdmVcclxuICAgIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gcmVjb3JkcyA9PiBhcnJheSBvZiBvYmplY3RzIHRvIHJlY29yZCBpbiBkYiwgd2hlcmUgbmFtZSBvZiB2YXJpYWJsZXMgaW4gb2JqZWN0cyBhcmUgZXF1YWwgdG8gY29sdW1uIG5hbWVzIGluIGRiXHJcbiAgICBAZG8gdXBkYXRlIGN1cnJlbnQgb2JqZWN0IHRvIGRiIGJ5IGl0cyBwcmltYXJ5IGtleSBvciBjcmVhdGUgbmV3IGluIGRiXHJcbiAgICBAcmV0dXJuIHJlY29yZHMgPT4gaWYgdGhlcmUgd2FzIG5ldyByZWNvcmQgaXQgc2V0IHByaW1hcnkga2V5IHRvIHJlY29yZC4gQWZ0ZXIgYWxsIGlzIHJldHVybiBpbiBuZXcgYXJyYXkgb2Ygb2JqZWN0LCB3aGljaCB3ZXJlIHBhc3NlZCB0byBtZXRob2RcclxuICBAbWV0aG9kIGRlbFxyXG4gICAgQHBhcmFtIHtBcnJheX0ga2V5cyA9PiBhcnJheSBvZiBwcmltYXJ5IGtleXMgaW4gb2JqZWN0XHJcbiAgICBAZG8gZGVsZXRlIGN1cnJlbnQgb2JqZWN0IGZyb20gZGJcclxuICBAbWV0aG9kIHNsXHJcbiAgICBAcGFyYW0ge1N0cmluZ30gd2hlcmUgPT4gd2hlcmUgc3FsIHF1ZXJ5LiBFeGFtcGxlIHdoZXJlID0gXCJpZCA9IDgsIG5hbWU9YFZhc2FgXCJcclxuICAgIEBwYXJhbSB7QXJyYXl9IGRhdGEgPT4gYXJyYXkgb2YgdmFsdWVzIHRvIHJlcGxhY2UgXCI/XCIgaW4gQHdoZXJlIHN0cmluZ1xyXG4gICAgQHJldHVybiB7QXJyYXk8T2JqZWN0Pn0gPT4gcmV0dXJuIHNlbGVjdGVkIG9iamVjdHMgZnJvbSBkYlxyXG5cclxuKi9cclxuY2xhc3MgVGFibGVTUUx7XHJcbiAgY29uc3RydWN0b3IoaywgdGFibGUsIHYpe1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIF90aGlzLmsgPSBrO1xyXG4gICAgX3RoaXMudGFibGUgPSB0YWJsZTtcclxuICAgIF90aGlzLnYgPSB2O1xyXG4gICAgLy9fdGhpcy5EQkFjY2VzcyA9IG5ldyBEQmFjY2VzcygpOlxyXG5cclxuICAgIC8qdGhpcy5EQkFjY2Vzcy5jcmVhdGVUYWJsZUlmTm90RXhpc3QoYENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICR7dGFibGV9KCR7KGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBjb2x1bW5zID0gXCJcIlxyXG4gICAgICBmb3IodmFyIGMgaW4gdil7XHJcbiAgICAgICAgY29sdW1ucyArPSB2W2NdICsgXCIsXCI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNvbHVtbnMuc2xpY2UoMCwgLTEpO1xyXG4gICAgfSkoKX0pYCk7Ki9cclxuXHJcbiAgICAvKmNvbnNvbGUubG9nKGBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAke3RhYmxlfSgkeyhmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgY29sdW1ucyA9IFwiXCJcclxuICAgICAgZm9yKHZhciBjIGluIHYpe1xyXG4gICAgICAgIGNvbHVtbnMgKz0gdltjXSArIFwiLFwiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb2x1bW5zLnNsaWNlKDAsIC0xKTtcclxuICAgIH0pKCl9KWApOyovXHJcblxyXG4gIH1cclxuXHJcbiAgLypsKGtleXMsIGNiKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICB2YXIgcmVjb3JkcyA9IFtdO1xyXG4gICAgdmFyIHByb2Nlc3NEQVRBID0gW107XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgaWYoa2V5c1tpXSl7XHJcbiAgICAgIHByb2Nlc3NEQVRBW3Byb2Nlc3NEQVRBLmxlbmd0aF0gPSB7XHJcbiAgICAgICAgXCJzcWxcIjogYFNFTEVDVCAqIEZST00gJHtfdGhpcy50YWJsZX0gV0hFUkUgJHtfdGhpcy5rfSBpbiAoJHsoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciByID0gXCJcIjtcclxuICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaisrKSByICs9IFwiPyxcIjtcclxuICAgICAgICAgIHJldHVybiByLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9KSgpfSlgLFxyXG4gICAgICAgIFwiZGF0YVwiOiBrZXlzLFxyXG4gICAgICAgIFwic3VjY2Vzc1wiOiAodHIsIHIpID0+IHtcclxuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCByLnJvd3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gci5yb3dzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIHJlY29yZHNbaV0gPSB7fTtcclxuICAgICAgICAgICAgZm9yKHZhciBjb2wgaW4gcm93KXtcclxuICAgICAgICAgICAgICByZWNvcmRzW2ldW2NvbF0gPSByb3dbY29sXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZihwcm9jZXNzREFUQS5sZW5ndGggPiAwKSB0aGlzLkRCQWNjZXNzLmxvYWQocHJvY2Vzc0RBVEEsIGNiLCByZWNvcmRzKTtcclxuICAgIGVsc2UgY2IocmVjb3Jkcyk7XHJcbiAgfSovXHJcbiAgbChrZXlzLCBjYil7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICQucG9zdChcIi9jcm0vbG9hZFwiLCB7a2V5czprZXlzLCB0YWJsZTogX3RoaXMudGFibGUsIGs6IF90aGlzLmt9KS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgIGNiKEpTT04ucGFyc2UoZGF0YSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKnNhdmUocmVjb3JkcywgY2Ipe1xyXG4gICAgdmFyIGsgPSB0aGlzLmssIHRhYmxlID0gdGhpcy50YWJsZSwgdiA9IHRoaXMudiwgZm9ySSA9IFtdLCBjb3VudGVyID0gMDtcclxuICAgIHZhciBwcm9jZXNzREFUQSA9IFtdO1xyXG5cclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCByZWNvcmRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYocmVjb3Jkc1tpXSAmJiAhcmVjb3Jkc1tpXVtrXSl7XHJcbiAgICAgICAgZm9ySVtmb3JJLmxlbmd0aF0gPSBpIC0gMTtcclxuICAgICAgICBwcm9jZXNzREFUQVtwcm9jZXNzREFUQS5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNxbFwiOiBgSU5TRVJUIElOVE8gJHt0YWJsZX0gJHsoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xzID0gXCIoXCIsIHZhbHMgPSBcIihcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgYyBpbiB2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYyA9PSBrKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scyArPSBjICsgXCIsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHMgKz0gXCI/LFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scyA9IGNvbHMuc2xpY2UoMCwgLTEpICsgXCIpXCIsIHZhbHMgPSB2YWxzLnNsaWNlKDAsIC0xKSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHN9IFZBTFVFUyAke3ZhbHN9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2RiID0gcmVjb3Jkc1tpXS50b0RCKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBjIGluIHYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYyA9PSBrKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJbci5sZW5ndGhdID0gdG9kYltjXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiAodHIsIHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRzW2ZvcklbY291bnRlcl0gKyAxXVtrXSA9IHIuaW5zZXJ0SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICB9ZWxzZSBpZihyZWNvcmRzW2ldKSBwcm9jZXNzREFUQVtwcm9jZXNzREFUQS5sZW5ndGhdID0ge1wic3FsXCI6IGBVUERBVEUgJHt0YWJsZX0gU0VUICR7KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgYyBpbiB2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGMgPT0gaykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjICE9IE9iamVjdC5rZXlzKGspWzBdKSB2YWxzICs9IGAke2N9ID0gPyxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFscy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCl9IFdIRVJFICR7a30gPSAke3JlY29yZHNbaV1ba119YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvZGIgPSByZWNvcmRzW2ldLnRvREIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGMgaW4gdil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjID09IGspIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcltyLmxlbmd0aF0gPSB0b2RiW2NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZihwcm9jZXNzREFUQS5sZW5ndGggPiAwKSB0aGlzLkRCQWNjZXNzLnNhdmUocHJvY2Vzc0RBVEEsICgpID0+IHtjYihyZWNvcmRzKX0pO1xyXG4gICAgZWxzZSBjYihyZWNvcmRzKTtcclxuICB9Ki9cclxuICBzYXZlKHJlY29yZHMsIGNiKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgJC5wb3N0KFwiL2NybS9zYXZlXCIsIHtyZWNvcmRzOiByZWNvcmRzLCB0YWJsZTogX3RoaXMudGFibGUsIGs6IF90aGlzLmssIHY6IF90aGlzLnZ9KS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgIGNiKEpTT04ucGFyc2UoZGF0YSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKmRlbChrZXlzKXtcclxuICAgIGtleXMgPSBrZXlzLm1hcChrZXkgPT4gcGFyc2VJbnQoa2V5KSk7XHJcbiAgICB2YXIgayA9IHRoaXMuaywgdGFibGUgPSB0aGlzLnRhYmxlO1xyXG5cclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSBpZihrZXlzW2ldKSB0aGlzLkRCQWNjZXNzLmRlbGV0ZSh7XHJcbiAgICAgIFwic3FsXCI6IGBERUxFVEUgRlJPTSAke3RhYmxlfSBXSEVSRSAke2t9ID0gP2AsXHJcbiAgICAgIFwiZGF0YVwiOiBba2V5c1tpXV1cclxuICAgIH0pO1xyXG4gIH0qL1xyXG4gIGRlbChrZXlzKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgJC5wb3N0KFwiL2NybS9kZWxcIiwge2tleXM6IGtleXMsIHRhYmxlOiBfdGhpcy50YWJsZSwgazogX3RoaXMua30pXHJcbiAgfVxyXG5cclxuICAvKnNsKHdoZXJlLCBkYXRhLCBjYil7XHJcbiAgICB2YXIgcmVjb3JkcyA9IFtdLCBmb3JJID0gW10sIGNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5EQkFjY2Vzcy5zZWxlY3Qoe1xyXG4gICAgICBcInNxbFwiOiBgU0VMRUNUICogRlJPTSAke3RoaXMudGFibGV9IFdIRVJFICR7d2hlcmV9YCxcclxuICAgICAgXCJkYXRhXCI6IGRhdGEsXHJcbiAgICAgIFwic3VjY2Vzc1wiOiAodHIsIHIpID0+IHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgci5yb3dzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgIHZhciByb3cgPSByLnJvd3MuaXRlbShpKTtcclxuICAgICAgICAgIHJlY29yZHNbaV0gPSBbXTtcclxuICAgICAgICAgIGZvcih2YXIgY29sIGluIHJvdyl7XHJcbiAgICAgICAgICAgIHJlY29yZHNbaV1bY29sXSA9IHJvd1tjb2xdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgKCkgPT4gY2IocmVjb3JkcykpO1xyXG4gIH0qL1xyXG4gIHNsKHdoZXJlLCBkYXRhLCBjYil7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICQucG9zdChcIi9jcm0vc2VsZWN0XCIsIHt3aGVyZTogd2hlcmUsIHRhYmxlOiBfdGhpcy50YWJsZSwgZGF0YTogZGF0YX0pLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgY2IoSlNPTi5wYXJzZShkYXRhKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
