class TableSQL{constructor(t,s,e){this.k=t,this.table=s,this.v=e}l(t,s){$.post("/crm/load",{keys:t,table:this.table,k:this.k}).done(t=>{s(t)})}save(t,s){$.post("/crm/save",{records:t,table:this.table,k:this.k,v:this.v}).done(t=>{s(t)})}del(t){$.post("/crm/del",{keys:t,table:this.table,k:this.k})}sl(t,s,e){$.post("/crm/select",{where:t,table:this.table,data:s}).done(t=>{e(t)})}}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0b3JhZ2UvVGFibGVTUUwuanMiXSwibmFtZXMiOlsiVGFibGVTUUwiLCJbb2JqZWN0IE9iamVjdF0iLCJrIiwidGFibGUiLCJ2IiwidGhpcyIsImtleXMiLCJjYiIsIiQiLCJwb3N0IiwiZG9uZSIsImRhdGEiLCJyZWNvcmRzIiwid2hlcmUiXSwibWFwcGluZ3MiOiJBQXlCQSxNQUFNQSxTQUNKQyxZQUFZQyxFQUFHQyxFQUFPQyxHQUNSQyxLQUNOSCxFQUFJQSxFQURFRyxLQUVORixNQUFRQSxFQUZGRSxLQUdORCxFQUFJQSxFQXdDWkgsRUFBRUssRUFBTUMsR0FHTkMsRUFBRUMsS0FBSyxZQUFhLENBQUNILEtBQUtBLEVBQU1ILE1BRnBCRSxLQUVpQ0YsTUFBT0QsRUFGeENHLEtBRWlESCxJQUFJUSxLQUFNQyxJQUNyRUosRUFBR0ksS0EyRFBWLEtBQUtXLEVBQVNMLEdBR1pDLEVBQUVDLEtBQUssWUFBYSxDQUFDRyxRQUFTQSxFQUFTVCxNQUYzQkUsS0FFd0NGLE1BQU9ELEVBRi9DRyxLQUV3REgsRUFBR0UsRUFGM0RDLEtBRW9FRCxJQUFJTSxLQUFNQyxJQUN4RkosRUFBR0ksS0FhUFYsSUFBSUssR0FHRkUsRUFBRUMsS0FBSyxXQUFZLENBQUNILEtBQU1BLEVBQU1ILE1BRnBCRSxLQUVpQ0YsTUFBT0QsRUFGeENHLEtBRWlESCxJQW1CL0RELEdBQUdZLEVBQU9GLEVBQU1KLEdBR2RDLEVBQUVDLEtBQUssY0FBZSxDQUFDSSxNQUFPQSxFQUFPVixNQUZ6QkUsS0FFc0NGLE1BQU9RLEtBQU1BLElBQU9ELEtBQU1DLElBQzFFSixFQUFHSSIsImZpbGUiOiJTdG9yYWdlL1RhYmxlU1FMLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbkBjbGFzcyBUYWJsZVNRTCwgcGFyZW50XHJcbkBwYXJhbXNcclxuICBAcGFyYW0ge1N0cmluZ30gayA9PiBjb2x1bW5OYW1lIG9mIHByaW1hcnlLZXkuIEV4YW1wbGU6IGsgPSBcImlkXCJcclxuICBAcGFyYW0ge1N0cmluZ30gdGFibGUgPT4gdGFibGUgbmFtZSBvZiBjdXJyZW50IG9iamVjdCBpbiBkYi4gRXhhbXBsZTogdGFibGUgPSBcImN1c3RvbWVyc1wiXHJcbiAgQHBhcmFtIHtPYmplY3R9IHYgPT4gSGFzaE1hcCBvZiBjb2x1bW4gbmFtZXMgaW4gb2JqZWN0IGFuZCBzcWwgc3RyaW5nIHRvIGNyZWF0ZSB0aGlzIGNvbHVtbi4gRXhhbXBsZTogdiA9IHtuYW1lOiBcIlx0YG5hbWVgIFZBUkNIQVIoODApIE5PVCBOVUxMXCJ9XHJcbiAgICAgICAgICAgICAgICAgIHYgPSB7Y29sdW1uTmFtZTogc3FsU3RyaW5nfVxyXG5AbWV0aG9kc1xyXG4gIEBtZXRob2QgbFxyXG4gICAgQHBhcmFtIHtBcnJheX0ga2V5cyA9PiBhcnJheSBvZiBwcmltYXJ5IGtleXMgaW4gb2JqZWN0XHJcbiAgICBAZG8gZGVsZXRlIGN1cnJlbnQgb2JqZWN0IGZyb20gZGJcclxuICAgIEByZXR1cm4ge0FycmF5PE9iamVjdD59ID0+IGFycmF5IG9mIG9iamVjdCBmcm9tIGRiXHJcbiAgQG1ldGhvZCBzYXZlXHJcbiAgICBAcGFyYW0ge0FycmF5PE9iamVjdD59IHJlY29yZHMgPT4gYXJyYXkgb2Ygb2JqZWN0cyB0byByZWNvcmQgaW4gZGIsIHdoZXJlIG5hbWUgb2YgdmFyaWFibGVzIGluIG9iamVjdHMgYXJlIGVxdWFsIHRvIGNvbHVtbiBuYW1lcyBpbiBkYlxyXG4gICAgQGRvIHVwZGF0ZSBjdXJyZW50IG9iamVjdCB0byBkYiBieSBpdHMgcHJpbWFyeSBrZXkgb3IgY3JlYXRlIG5ldyBpbiBkYlxyXG4gICAgQHJldHVybiByZWNvcmRzID0+IGlmIHRoZXJlIHdhcyBuZXcgcmVjb3JkIGl0IHNldCBwcmltYXJ5IGtleSB0byByZWNvcmQuIEFmdGVyIGFsbCBpcyByZXR1cm4gaW4gbmV3IGFycmF5IG9mIG9iamVjdCwgd2hpY2ggd2VyZSBwYXNzZWQgdG8gbWV0aG9kXHJcbiAgQG1ldGhvZCBkZWxcclxuICAgIEBwYXJhbSB7QXJyYXl9IGtleXMgPT4gYXJyYXkgb2YgcHJpbWFyeSBrZXlzIGluIG9iamVjdFxyXG4gICAgQGRvIGRlbGV0ZSBjdXJyZW50IG9iamVjdCBmcm9tIGRiXHJcbiAgQG1ldGhvZCBzbFxyXG4gICAgQHBhcmFtIHtTdHJpbmd9IHdoZXJlID0+IHdoZXJlIHNxbCBxdWVyeS4gRXhhbXBsZSB3aGVyZSA9IFwiaWQgPSA4LCBuYW1lPWBWYXNhYFwiXHJcbiAgICBAcGFyYW0ge0FycmF5fSBkYXRhID0+IGFycmF5IG9mIHZhbHVlcyB0byByZXBsYWNlIFwiP1wiIGluIEB3aGVyZSBzdHJpbmdcclxuICAgIEByZXR1cm4ge0FycmF5PE9iamVjdD59ID0+IHJldHVybiBzZWxlY3RlZCBvYmplY3RzIGZyb20gZGJcclxuXHJcbiovXHJcbmNsYXNzIFRhYmxlU1FMe1xyXG4gIGNvbnN0cnVjdG9yKGssIHRhYmxlLCB2KXtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICBfdGhpcy5rID0gaztcclxuICAgIF90aGlzLnRhYmxlID0gdGFibGU7XHJcbiAgICBfdGhpcy52ID0gdjtcclxuICAgIC8vX3RoaXMuREJBY2Nlc3MgPSBuZXcgREJhY2Nlc3MoKTpcclxuXHJcbiAgICAvKnRoaXMuREJBY2Nlc3MuY3JlYXRlVGFibGVJZk5vdEV4aXN0KGBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAke3RhYmxlfSgkeyhmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgY29sdW1ucyA9IFwiXCJcclxuICAgICAgZm9yKHZhciBjIGluIHYpe1xyXG4gICAgICAgIGNvbHVtbnMgKz0gdltjXSArIFwiLFwiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb2x1bW5zLnNsaWNlKDAsIC0xKTtcclxuICAgIH0pKCl9KWApOyovXHJcblxyXG4gIH1cclxuXHJcbiAgLypsKGtleXMsIGNiKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICB2YXIgcmVjb3JkcyA9IFtdO1xyXG4gICAgdmFyIHByb2Nlc3NEQVRBID0gW107XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgaWYoa2V5c1tpXSl7XHJcbiAgICAgIHByb2Nlc3NEQVRBW3Byb2Nlc3NEQVRBLmxlbmd0aF0gPSB7XHJcbiAgICAgICAgXCJzcWxcIjogYFNFTEVDVCAqIEZST00gJHtfdGhpcy50YWJsZX0gV0hFUkUgJHtfdGhpcy5rfSBpbiAoJHsoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciByID0gXCJcIjtcclxuICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaisrKSByICs9IFwiPyxcIjtcclxuICAgICAgICAgIHJldHVybiByLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9KSgpfSlgLFxyXG4gICAgICAgIFwiZGF0YVwiOiBrZXlzLFxyXG4gICAgICAgIFwic3VjY2Vzc1wiOiAodHIsIHIpID0+IHtcclxuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCByLnJvd3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gci5yb3dzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIHJlY29yZHNbaV0gPSB7fTtcclxuICAgICAgICAgICAgZm9yKHZhciBjb2wgaW4gcm93KXtcclxuICAgICAgICAgICAgICByZWNvcmRzW2ldW2NvbF0gPSByb3dbY29sXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZihwcm9jZXNzREFUQS5sZW5ndGggPiAwKSB0aGlzLkRCQWNjZXNzLmxvYWQocHJvY2Vzc0RBVEEsIGNiLCByZWNvcmRzKTtcclxuICAgIGVsc2UgY2IocmVjb3Jkcyk7XHJcbiAgfSovXHJcbiAgbChrZXlzLCBjYil7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICQucG9zdChcIi9jcm0vbG9hZFwiLCB7a2V5czprZXlzLCB0YWJsZTogX3RoaXMudGFibGUsIGs6IF90aGlzLmt9KS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgIGNiKGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKnNhdmUocmVjb3JkcywgY2Ipe1xyXG4gICAgdmFyIGsgPSB0aGlzLmssIHRhYmxlID0gdGhpcy50YWJsZSwgdiA9IHRoaXMudiwgZm9ySSA9IFtdLCBjb3VudGVyID0gMDtcclxuICAgIHZhciBwcm9jZXNzREFUQSA9IFtdO1xyXG5cclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCByZWNvcmRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYocmVjb3Jkc1tpXSAmJiAhcmVjb3Jkc1tpXVtrXSl7XHJcbiAgICAgICAgZm9ySVtmb3JJLmxlbmd0aF0gPSBpIC0gMTtcclxuICAgICAgICBwcm9jZXNzREFUQVtwcm9jZXNzREFUQS5sZW5ndGhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNxbFwiOiBgSU5TRVJUIElOVE8gJHt0YWJsZX0gJHsoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xzID0gXCIoXCIsIHZhbHMgPSBcIihcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgYyBpbiB2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYyA9PSBrKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scyArPSBjICsgXCIsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHMgKz0gXCI/LFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scyA9IGNvbHMuc2xpY2UoMCwgLTEpICsgXCIpXCIsIHZhbHMgPSB2YWxzLnNsaWNlKDAsIC0xKSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2NvbHN9IFZBTFVFUyAke3ZhbHN9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2RiID0gcmVjb3Jkc1tpXS50b0RCKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBjIGluIHYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYyA9PSBrKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJbci5sZW5ndGhdID0gdG9kYltjXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiAodHIsIHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRzW2ZvcklbY291bnRlcl0gKyAxXVtrXSA9IHIuaW5zZXJ0SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICB9ZWxzZSBpZihyZWNvcmRzW2ldKSBwcm9jZXNzREFUQVtwcm9jZXNzREFUQS5sZW5ndGhdID0ge1wic3FsXCI6IGBVUERBVEUgJHt0YWJsZX0gU0VUICR7KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgYyBpbiB2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGMgPT0gaykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjICE9IE9iamVjdC5rZXlzKGspWzBdKSB2YWxzICs9IGAke2N9ID0gPyxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFscy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCl9IFdIRVJFICR7a30gPSAke3JlY29yZHNbaV1ba119YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvZGIgPSByZWNvcmRzW2ldLnRvREIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGMgaW4gdil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjID09IGspIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcltyLmxlbmd0aF0gPSB0b2RiW2NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZihwcm9jZXNzREFUQS5sZW5ndGggPiAwKSB0aGlzLkRCQWNjZXNzLnNhdmUocHJvY2Vzc0RBVEEsICgpID0+IHtjYihyZWNvcmRzKX0pO1xyXG4gICAgZWxzZSBjYihyZWNvcmRzKTtcclxuICB9Ki9cclxuICBzYXZlKHJlY29yZHMsIGNiKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgJC5wb3N0KFwiL2NybS9zYXZlXCIsIHtyZWNvcmRzOiByZWNvcmRzLCB0YWJsZTogX3RoaXMudGFibGUsIGs6IF90aGlzLmssIHY6IF90aGlzLnZ9KS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgIGNiKGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKmRlbChrZXlzKXtcclxuICAgIGtleXMgPSBrZXlzLm1hcChrZXkgPT4gcGFyc2VJbnQoa2V5KSk7XHJcbiAgICB2YXIgayA9IHRoaXMuaywgdGFibGUgPSB0aGlzLnRhYmxlO1xyXG5cclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSBpZihrZXlzW2ldKSB0aGlzLkRCQWNjZXNzLmRlbGV0ZSh7XHJcbiAgICAgIFwic3FsXCI6IGBERUxFVEUgRlJPTSAke3RhYmxlfSBXSEVSRSAke2t9ID0gP2AsXHJcbiAgICAgIFwiZGF0YVwiOiBba2V5c1tpXV1cclxuICAgIH0pO1xyXG4gIH0qL1xyXG4gIGRlbChrZXlzKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgJC5wb3N0KFwiL2NybS9kZWxcIiwge2tleXM6IGtleXMsIHRhYmxlOiBfdGhpcy50YWJsZSwgazogX3RoaXMua30pXHJcbiAgfVxyXG5cclxuICAvKnNsKHdoZXJlLCBkYXRhLCBjYil7XHJcbiAgICB2YXIgcmVjb3JkcyA9IFtdLCBmb3JJID0gW10sIGNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5EQkFjY2Vzcy5zZWxlY3Qoe1xyXG4gICAgICBcInNxbFwiOiBgU0VMRUNUICogRlJPTSAke3RoaXMudGFibGV9IFdIRVJFICR7d2hlcmV9YCxcclxuICAgICAgXCJkYXRhXCI6IGRhdGEsXHJcbiAgICAgIFwic3VjY2Vzc1wiOiAodHIsIHIpID0+IHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgci5yb3dzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgIHZhciByb3cgPSByLnJvd3MuaXRlbShpKTtcclxuICAgICAgICAgIHJlY29yZHNbaV0gPSBbXTtcclxuICAgICAgICAgIGZvcih2YXIgY29sIGluIHJvdyl7XHJcbiAgICAgICAgICAgIHJlY29yZHNbaV1bY29sXSA9IHJvd1tjb2xdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgKCkgPT4gY2IocmVjb3JkcykpO1xyXG4gIH0qL1xyXG4gIHNsKHdoZXJlLCBkYXRhLCBjYil7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICQucG9zdChcIi9jcm0vc2VsZWN0XCIsIHt3aGVyZTogd2hlcmUsIHRhYmxlOiBfdGhpcy50YWJsZSwgZGF0YTogZGF0YX0pLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgY2IoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
