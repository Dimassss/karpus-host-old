class CycleController{constructor(){return g.Controller.Cycles.instance?g.Controller.Cycles.instance:(this.dao=new CyclesDAO,this.in=new CyclesInput,g.Controller.Cycles.instance=this)}addCyclesToNavBar(e,t){g.Controller.Cycles.instance.dao.dispalyCycles("TRUE ORDER BY id DESC LIMIT ?, ?",[g.Controller.Cycles.cyclesNavBarScrollCounter*g.Controller.Cycles.cyclesNavBarCountToSelect,g.Controller.Cycles.cyclesNavBarCountToSelect],t)}scrollNavBarLeft(e){g.Controller.Cycles.toScroll=setInterval(()=>document.querySelector(".cycles-tab-container .cycles").scrollBy(-3,0),6)}scrollNavBarRight(e){g.Controller.Cycles.toScroll=setInterval(()=>document.querySelector(".cycles-tab-container .cycles").scrollBy(3,0),6)}endScroll(e){clearInterval(g.Controller.Cycles.toScroll),g.Controller.Cycles.toScroll=void 0}createCycle(e){let t=g.Controller.Cycles.instance;var l=t.in.takeData("add_c");""!=l&&t.dao.createCycle(-1,l,l=>{t.dao.dispalyCycles("id = ?",[l],()=>{t.selectCycle(e,l)})})}selectCycle(e,t,l){let r=g.Controller.Cycles.instance;t=void 0!==t?t:e.target.getAttribute("for").split("-")[1],r.dao.fillCycleWindows(t,l)}editOrder(e){let t=g.Controller.Cycles.instance;t.dao.openOrderCreatingWindow(),t.dao.fillOrderCreatingWin(parseInt(e.target.parentNode.getAttribute("data-id")))}closeOrder(e){g.Controller.Cycles.instance.dao.closeOrderCreatingWindow()}saveOrder(e){let t=g.Controller.Cycles.instance;t.dao.getOrderFromPage((e,l)=>{t.dao.saveOrder(e),t.dao.saveCustomer(l),t.dao.closeOrderCreatingWindow()})}displayKitsOnCycleSelect(e){let t=g.Controller.Cycles.instance;t.dao.displayKits(t.in.takeData("AW_c_id"))}deleteCycle(e){let t=g.Controller.Cycles.instance,l=t.in.takeData("C_ID");t.dao.cleanCycleWindows(l),t.dao.deleteCycle(l)}deleteRecord(e){let t=g.Controller.Cycles.instance.in.takeData("Tbl_Slct"),l={orders:new OrderTableSQL,products:new ProductTableSQL,kits:new KitTableSQL}[t[0]];new CycleTableSQL;(new CyclesOutput).insertData(t[0][0].toUpperCase()+"_Tbl",{body:[[{id:t[1]}]]}),l.del([t[1]])}selectRecord(e){let t=g.Controller.Cycles.instance,l=t.in.takeData("Tbl_Slct");l[2]&&l[2].classList.remove("selected"),e.target.parentNode.classList.add("selected"),l=t.in.takeData("Tbl_Slct");let r={orders:void 0,products:t.dao.fillProductProfile,kits:t.dao.fillKitProfile}[l[0]];null!=r&&r(l[1],t.in.takeData("C_ID"))}addToArray(e){g.Controller.Cycles.instance.dao.addToArray(...{Paid:["AW_P",["",""]],Date:["AW_P",["",""]]}[e.target.parentNode.querySelector("input").getAttribute("placeholder")])}saveProduct(e,t){let l=g.Controller.Cycles.instance,r=new CyclesOutput;var o=l.dao.takeProductFromPage();const a=o.id+1;var c=new ProductTableSQL,n=new CycleTableSQL;"js-product-count-set"==e.path[4].id&&(console.log(o),o.count["c-kt"]=o.count["c-st"]-o.count["c-wh"]-o.count["c-sh"],o.count["c-lft"]=o.count["c-kt"]-o.count["c-or"],r.insertData("P_C",o.count)),c.save([o],e=>{e[0].id!=a-1&&(n.load([e[0].cycleID],t=>{t[0]&&(t[0].productsID[t[0].productsID.length]=e[0].id,n.save(t,()=>{}))}),(new CyclesOutput).insertData("P_ID",e[0].id)),l.dao.fillProductsWin([e[0].id],t)})}saveKit(e,t,l){let r=g.Controller.Cycles.instance;var o=r.dao.takeKitFromPage();const a=o.id+1;(new KitTableSQL).save([o],e=>{let l=new CyclesOutput;e[0].id!=a-1&&l.insertData("K_ID",e[0].id),r.dao.fillKitsWin([e[0].id],t),l.insertData("K_PcPr",Number(e[0].pcPrice.toFixed(2))),l.insertData("K_PcW",Number(e[0].pcWeight.toFixed(2)))})}createKit(e){let t=g.Controller.Cycles.instance;Array.from(document.querySelectorAll("table .selected")).forEach(e=>e.classList.remove("selected")),t.dao.cleanKitProfile(t.in.takeData("C_ID"))}createProduct(e){let t=g.Controller.Cycles.instance;Array.from(document.querySelectorAll("table .selected")).forEach(e=>e.classList.remove("selected")),t.dao.cleanProductProfile()}search(e){g.Controller.Cycles.instance;let t=e.target.parentNode.querySelector("table"),l=e.target.value,r=""===l?()=>!0:e=>Array.from(e.querySelectorAll("td")).filter(e=>e.innerHTML.search(l)>-1).length>0;Array.from(t.querySelectorAll("tbody tr")).forEach(e=>e.style.display=r(e)?"table":"none")}updateOrderForm(e){let t=g.Controller.Cycles.instance,l=t.dao.getOrderFromPage(void 0,1);t.dao.updateOrderForm(l)}}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRyb2xsZXJzL0N5Y2xlQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJDeWNsZUNvbnRyb2xsZXIiLCJbb2JqZWN0IE9iamVjdF0iLCJnIiwiQ29udHJvbGxlciIsIkN5Y2xlcyIsImluc3RhbmNlIiwidGhpcyIsImRhbyIsIkN5Y2xlc0RBTyIsImluIiwiQ3ljbGVzSW5wdXQiLCJlIiwiY2IiLCJkaXNwYWx5Q3ljbGVzIiwiY3ljbGVzTmF2QmFyU2Nyb2xsQ291bnRlciIsImN5Y2xlc05hdkJhckNvdW50VG9TZWxlY3QiLCJ0b1Njcm9sbCIsInNldEludGVydmFsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2Nyb2xsQnkiLCJjbGVhckludGVydmFsIiwidW5kZWZpbmVkIiwiX3RoaXMiLCJjeWNsZU5hbWUiLCJ0YWtlRGF0YSIsImNyZWF0ZUN5Y2xlIiwiY3ljbGVJRCIsInNlbGVjdEN5Y2xlIiwiaWQiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJzcGxpdCIsImZpbGxDeWNsZVdpbmRvd3MiLCJvcGVuT3JkZXJDcmVhdGluZ1dpbmRvdyIsImZpbGxPcmRlckNyZWF0aW5nV2luIiwicGFyc2VJbnQiLCJwYXJlbnROb2RlIiwiY2xvc2VPcmRlckNyZWF0aW5nV2luZG93IiwiZ2V0T3JkZXJGcm9tUGFnZSIsIm9yZGVyIiwiY3VzdG9tZXIiLCJzYXZlT3JkZXIiLCJzYXZlQ3VzdG9tZXIiLCJkaXNwbGF5S2l0cyIsImNsZWFuQ3ljbGVXaW5kb3dzIiwiZGVsZXRlQ3ljbGUiLCJzbCIsImRiIiwib3JkZXJzIiwiT3JkZXJUYWJsZVNRTCIsInByb2R1Y3RzIiwiUHJvZHVjdFRhYmxlU1FMIiwia2l0cyIsIktpdFRhYmxlU1FMIiwiQ3ljbGVUYWJsZVNRTCIsIkN5Y2xlc091dHB1dCIsImluc2VydERhdGEiLCJ0b1VwcGVyQ2FzZSIsImJvZHkiLCJkZWwiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJmaWxsUHJvZmlsZSIsImZpbGxQcm9kdWN0UHJvZmlsZSIsImZpbGxLaXRQcm9maWxlIiwiYWRkVG9BcnJheSIsIlBhaWQiLCJEYXRlIiwib3V0IiwicHJvZHVjdCIsInRha2VQcm9kdWN0RnJvbVBhZ2UiLCJkYkN5Y2xlIiwicGF0aCIsImNvbnNvbGUiLCJsb2ciLCJjb3VudCIsInNhdmUiLCJsb2FkIiwiY3ljbGVzIiwibGVuZ3RoIiwiZmlsbFByb2R1Y3RzV2luIiwidCIsImtpdCIsInRha2VLaXRGcm9tUGFnZSIsImZpbGxLaXRzV2luIiwiTnVtYmVyIiwidG9GaXhlZCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicyIsImNsZWFuS2l0UHJvZmlsZSIsImNsZWFuUHJvZHVjdFByb2ZpbGUiLCJ0YWJsZSIsInN0ciIsInZhbHVlIiwidHIiLCJmaWx0ZXIiLCJ0ZCIsImlubmVySFRNTCIsInNlYXJjaCIsInN0eWxlIiwiZGlzcGxheSIsInVwZGF0ZU9yZGVyRm9ybSJdLCJtYXBwaW5ncyI6IkFBbUNBLE1BQU1BLGdCQUNKQyxjQUNFLE9BQUdDLEVBQUVDLFdBQVdDLE9BQU9DLFNBQWlCSCxFQUFFQyxXQUFXQyxPQUFPQyxVQUM1REMsS0FBS0MsSUFBTSxJQUFJQyxVQUNmRixLQUFLRyxHQUFLLElBQUlDLFlBQ1BSLEVBQUVDLFdBQVdDLE9BQU9DLFNBQVdDLE1BR3hDTCxrQkFBa0JVLEVBQUdDLEdBQ1BWLEVBQUVDLFdBQVdDLE9BQU9DLFNBQzFCRSxJQUFJTSxjQUFjLG1DQUFvQyxDQUNwRFgsRUFBRUMsV0FBV0MsT0FBT1UsMEJBQTRCWixFQUFFQyxXQUFXQyxPQUFPVywwQkFDcEViLEVBQUVDLFdBQVdDLE9BQU9XLDJCQUNuQkgsR0FHWFgsaUJBQWlCVSxHQUNmVCxFQUFFQyxXQUFXQyxPQUFPWSxTQUFXQyxZQUFZLElBQU1DLFNBQVNDLGNBQWMsaUNBQWlDQyxVQUFVLEVBQUcsR0FBSSxHQUc1SG5CLGtCQUFrQlUsR0FDaEJULEVBQUVDLFdBQVdDLE9BQU9ZLFNBQVdDLFlBQVksSUFBTUMsU0FBU0MsY0FBYyxpQ0FBaUNDLFNBQVMsRUFBRyxHQUFJLEdBRzNIbkIsVUFBVVUsR0FDUlUsY0FBY25CLEVBQUVDLFdBQVdDLE9BQU9ZLFVBQ2xDZCxFQUFFQyxXQUFXQyxPQUFPWSxjQUFXTSxFQUdqQ3JCLFlBQVlVLEdBQ1YsSUFBSVksRUFBUXJCLEVBQUVDLFdBQVdDLE9BQU9DLFNBRWhDLElBQUltQixFQUFZRCxFQUFNZCxHQUFHZ0IsU0FBUyxTQUNsQixJQUFiRCxHQUNERCxFQUFNaEIsSUFBSW1CLGFBQTZDLEVBQUdGLEVBQVdHLElBQ25FSixFQUFNaEIsSUFBSU0sY0FBYyxTQUFVLENBQUNjLEdBQVUsS0FDM0NKLEVBQU1LLFlBQVlqQixFQUFHZ0IsT0FPN0IxQixZQUFZVSxFQUFHa0IsRUFBSWpCLEdBQ2pCLElBQUlXLEVBQVFyQixFQUFFQyxXQUFXQyxPQUFPQyxTQUNoQ3dCLE9BQW1CLElBQVBBLEVBQW1CQSxFQUFHbEIsRUFBRW1CLE9BQU9DLGFBQWEsT0FBT0MsTUFBTSxLQUFLLEdBQzFFVCxFQUFNaEIsSUFBSTBCLGlCQUFpQkosRUFBSWpCLEdBR2pDWCxVQUFVVSxHQUNSLElBQUlZLEVBQVFyQixFQUFFQyxXQUFXQyxPQUFPQyxTQUNoQ2tCLEVBQU1oQixJQUFJMkIsMEJBQ1ZYLEVBQU1oQixJQUFJNEIscUJBQXFCQyxTQUFTekIsRUFBRW1CLE9BQU9PLFdBQVdOLGFBQWEsYUFHM0U5QixXQUFXVSxHQUNHVCxFQUFFQyxXQUFXQyxPQUFPQyxTQUMxQkUsSUFBSStCLDJCQUdackMsVUFBVVUsR0FDUixJQUFJWSxFQUFRckIsRUFBRUMsV0FBV0MsT0FBT0MsU0FDaENrQixFQUFNaEIsSUFBSWdDLGlCQUFpQixDQUFDQyxFQUFPQyxLQUNqQ2xCLEVBQU1oQixJQUFJbUMsVUFBVUYsR0FDcEJqQixFQUFNaEIsSUFBSW9DLGFBQWFGLEdBQ3ZCbEIsRUFBTWhCLElBQUkrQiw2QkFJZHJDLHlCQUF5QlUsR0FDdkIsSUFBSVksRUFBUXJCLEVBQUVDLFdBQVdDLE9BQU9DLFNBQ2hDa0IsRUFBTWhCLElBQUlxQyxZQUFZckIsRUFBTWQsR0FBR2dCLFNBQVMsWUFHMUN4QixZQUFZVSxHQUNWLElBQUlZLEVBQVFyQixFQUFFQyxXQUFXQyxPQUFPQyxTQUM1QnNCLEVBQVVKLEVBQU1kLEdBQUdnQixTQUFTLFFBQ2hDRixFQUFNaEIsSUFBSXNDLGtCQUFrQmxCLEdBQzVCSixFQUFNaEIsSUFBSXVDLFlBQVluQixHQUd4QjFCLGFBQWFVLEdBQ1gsSUFDSW9DLEVBRFE3QyxFQUFFQyxXQUFXQyxPQUFPQyxTQUNqQkksR0FBR2dCLFNBQVMsWUFDdkJ1QixFQUFLLENBQUVDLE9BQVUsSUFBSUMsY0FBaUJDLFNBQVksSUFBSUMsZ0JBQW1CQyxLQUFRLElBQUlDLGFBQWdCUCxFQUFHLElBQzlGLElBQUlRLGVBRWxCLElBQUtDLGNBQWdCQyxXQUFXVixFQUFHLEdBQUcsR0FBR1csY0FBZ0IsT0FBUSxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDOUIsR0FBSWtCLEVBQUcsUUFDakZDLEVBQUdZLElBQUksQ0FBQ2IsRUFBRyxLQUdiOUMsYUFBYVUsR0FDWCxJQUFJWSxFQUFRckIsRUFBRUMsV0FBV0MsT0FBT0MsU0FDNUIwQyxFQUFLeEIsRUFBTWQsR0FBR2dCLFNBQVMsWUFDeEJzQixFQUFHLElBQUlBLEVBQUcsR0FBR2MsVUFBVUMsT0FBTyxZQUNqQ25ELEVBQUVtQixPQUFPTyxXQUFXd0IsVUFBVUUsSUFBSSxZQUNsQ2hCLEVBQUt4QixFQUFNZCxHQUFHZ0IsU0FBUyxZQUN2QixJQUFJdUMsRUFBYyxDQUFFZixZQUFVM0IsRUFBVzZCLFNBQVk1QixFQUFNaEIsSUFBSTBELG1CQUFvQlosS0FBUTlCLEVBQU1oQixJQUFJMkQsZ0JBQWlCbkIsRUFBRyxJQUN2R3pCLE1BQWYwQyxHQUEwQkEsRUFBWWpCLEVBQUcsR0FBSXhCLEVBQU1kLEdBQUdnQixTQUFTLFNBR3BFeEIsV0FBV1UsR0FDR1QsRUFBRUMsV0FBV0MsT0FBT0MsU0FDMUJFLElBQUk0RCxjQUFjLENBQ2RDLEtBQU8sQ0FBQyxPQUFRLENBQUMsR0FBSSxLQUNyQkMsS0FBTyxDQUFDLE9BQVEsQ0FBQyxHQUFJLE1BQ3BCMUQsRUFBRW1CLE9BQU9PLFdBQVdsQixjQUFjLFNBQVNZLGFBQWEsaUJBR3JFOUIsWUFBWVUsRUFBR0MsR0FDYixJQUFJVyxFQUFRckIsRUFBRUMsV0FBV0MsT0FBT0MsU0FDNUJpRSxFQUFNLElBQUlkLGFBQ2QsSUFBSWUsRUFBVWhELEVBQU1oQixJQUFJaUUsc0JBQ3hCLE1BQU0zQyxFQUFLMEMsRUFBWSxHQUFJLEVBQzNCLElBQUl2QixFQUFLLElBQUlJLGdCQUNUcUIsRUFBVSxJQUFJbEIsY0FFQyx3QkFBaEI1QyxFQUFFK0QsS0FBSyxHQUFHN0MsS0FDWDhDLFFBQVFDLElBQUlMLEdBQ1pBLEVBQVFNLE1BQU0sUUFBVU4sRUFBUU0sTUFBTSxRQUFVTixFQUFRTSxNQUFNLFFBQVVOLEVBQVFNLE1BQU0sUUFDdEZOLEVBQVFNLE1BQU0sU0FBV04sRUFBUU0sTUFBTSxRQUFVTixFQUFRTSxNQUFNLFFBRS9EUCxFQUFJYixXQUFXLE1BQU9jLEVBQVFNLFFBR2hDN0IsRUFBRzhCLEtBQUssQ0FBQ1AsR0FBVXBCLElBQ2RBLEVBQVMsR0FBTyxJQUFLdEIsRUFBSyxJQUMzQjRDLEVBQVFNLEtBQUssQ0FBQzVCLEVBQVMsR0FBWSxTQUFJNkIsSUFDbENBLEVBQU8sS0FDUkEsRUFBTyxHQUFlLFdBQUVBLEVBQU8sR0FBZSxXQUFFQyxRQUFVOUIsRUFBUyxHQUFPLEdBQzFFc0IsRUFBUUssS0FBS0UsRUFBUSxZQUd6QixJQUFLeEIsY0FBZ0JDLFdBQVcsT0FBUU4sRUFBUyxHQUFPLEtBRTFENUIsRUFBTWhCLElBQUkyRSxnQkFBZ0IsQ0FBQy9CLEVBQVMsR0FBTyxJQUFJdkMsS0FLbkRYLFFBQVFVLEVBQUdDLEVBQUl1RSxHQUNiLElBQUk1RCxFQUFRckIsRUFBRUMsV0FBV0MsT0FBT0MsU0FDaEMsSUFBSStFLEVBQU03RCxFQUFNaEIsSUFBSThFLGtCQUNwQixNQUFNeEQsRUFBS3VELEVBQVEsR0FBSSxHQUNkLElBQUk5QixhQUVWd0IsS0FBSyxDQUFDTSxHQUFNL0IsSUFDYixJQUFJaUIsRUFBTSxJQUFJZCxhQUNYSCxFQUFLLEdBQU8sSUFBS3hCLEVBQUssR0FDdkJ5QyxFQUFJYixXQUFXLE9BQVFKLEVBQUssR0FBTyxJQUVyQzlCLEVBQU1oQixJQUFJK0UsWUFBWSxDQUFDakMsRUFBSyxHQUFPLElBQUl6QyxHQUN2QzBELEVBQUliLFdBQVcsU0FBVThCLE9BQVFsQyxFQUFLLEdBQVUsUUFBRW1DLFFBQVEsS0FDMURsQixFQUFJYixXQUFXLFFBQVM4QixPQUFRbEMsRUFBSyxHQUFXLFNBQUVtQyxRQUFRLE9BSTlEdkYsVUFBVVUsR0FDUixJQUFJWSxFQUFRckIsRUFBRUMsV0FBV0MsT0FBT0MsU0FDaENvRixNQUFNQyxLQUFLeEUsU0FBU3lFLGlCQUFpQixvQkFBb0JDLFFBQVFDLEdBQUtBLEVBQUVoQyxVQUFVQyxPQUFPLGFBQ3pGdkMsRUFBTWhCLElBQUl1RixnQkFBZ0J2RSxFQUFNZCxHQUFHZ0IsU0FBUyxTQUc5Q3hCLGNBQWNVLEdBQ1osSUFBSVksRUFBUXJCLEVBQUVDLFdBQVdDLE9BQU9DLFNBQ2hDb0YsTUFBTUMsS0FBS3hFLFNBQVN5RSxpQkFBaUIsb0JBQW9CQyxRQUFRQyxHQUFLQSxFQUFFaEMsVUFBVUMsT0FBTyxhQUN6RnZDLEVBQU1oQixJQUFJd0Ysc0JBR1o5RixPQUFPVSxHQUNPVCxFQUFFQyxXQUFXQyxPQUFPQyxTQUFoQyxJQUNJMkYsRUFBUXJGLEVBQUVtQixPQUFPTyxXQUFXbEIsY0FBYyxTQUMxQzhFLEVBQU10RixFQUFFbUIsT0FBT29FLE1BQ2ZMLEVBQVcsS0FBTkksRUFBVSxLQUFPLEVBQU9FLEdBQU1WLE1BQU1DLEtBQUtTLEVBQUdSLGlCQUFpQixPQUFPUyxPQUFPQyxHQUFNQSxFQUFHQyxVQUFVQyxPQUFPTixJQUFRLEdBQUdoQixPQUFTLEVBQ2xJUSxNQUFNQyxLQUFLTSxFQUFNTCxpQkFBaUIsYUFBYUMsUUFBUU8sR0FBTUEsRUFBR0ssTUFBTUMsUUFBVVosRUFBRU0sR0FBSSxRQUFRLFFBR2hHbEcsZ0JBQWdCVSxHQUNkLElBQUlZLEVBQVFyQixFQUFFQyxXQUFXQyxPQUFPQyxTQUM1QmdELEVBQU85QixFQUFNaEIsSUFBSWdDLHNCQUFpQmpCLEVBQVUsR0FDaERDLEVBQU1oQixJQUFJbUcsZ0JBQWdCckQiLCJmaWxlIjoiQ29udHJvbGxlcnMvQ3ljbGVDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbkBjbGFzcyBDdXN0b21lclByb2ZpbGVDb250cm9sbGVyXHJcblxyXG5AbWV0aG9kc1xyXG4gIEBtZXRob2QgYWRkQ3ljbGVzVG9OYXZCYXJcclxuICAgIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgIEBkbyBvbiBzY3JvbGwgaW4gY3ljbGVzIG5hdiBiYXJzIGl0IGFkZCBuZXcgY3ljbGVzIG5hbWVzIHRvIHRoYXQgbmF2IGJhcnNcclxuICBAbWV0aG9kIHNjcm9sbE5hdkJhckxlZnRcclxuICAgIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgIEBkbyBzY3JvbGwgbmF2IGJhciBvZiBjeWNsZXMgdG8gbGVmdCBzaWRlIG9uIGNsaWNrIG9uIGxlZnQgc2lkZSBhcnJvd1xyXG4gIEBtZXRob2Qgc2Nyb2xsTmF2QmFyUmlnaHRcclxuICAgIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgIEBkbyBzY3JvbGwgbmF2IGJhciBvZiBjeWNsZXMgdG8gcmlnaHQgc2lkZSBvbiBjbGljayBvbiByaWdodCBzaWRlIGFycm93XHJcbiAgQG1ldGhvZCBlbmRTY3JvbGxcclxuICAgIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgIEBkbyBzZXQgZy5Db250cm9sbGVyLkN5Y2xlcy50b1Njcm9sbCA9IGZhbHNlIHRvIHN0b3Agc2Nyb2xsaW5nIGluIC5jeWNsZXMgY29udGFpbmVyXHJcbiAgQG1ldGhvZCBjcmVhdGVDeWNsZVxyXG4gICAgQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgQGRvIG9uIGNsaWNrIG9uIFwidGlja1wiIHNhdmUgYnV0dG9uIGluIGN5Y2xlcy1mb290ZXIgdG8gY3JlYXRlIGN5Y2xlIGl0IHRha2UgdmFsdWUgZnJvbSBmaWVsZCBhbmQgYWRkIGl0IHRvIGRiIGFuZCBzZWxlY3QgbmF2IGJhcnNcclxuICBAbWV0aG9kIHNlbGVjdEN5Y2xlXHJcbiAgICBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICBAZG8gb24gY2xpY2sgb24gY3ljbGUgbmFtZSBpbiBjeWNsZXMgbmF2IGJhciBpdCBsb2FkIGN5Y2xlJ3Mgb3JkZXJzLCBraXRzIGFuZCBwcm9kY3RzIHRvIHRoZSB3aW5kb3dzXHJcbiAgQG1ldGhvZCBlZGl0T3JkZXJcclxuICAgIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgIEBkbyBvbiBkb3VibGUgY2xpY2sgb24gb3JkZXIgcm93IGl0IHNob3dzIGFsZXJ0V2luZG93LCB3aGVyZSBmaWVsZHMgYXJlIGZpbGxlZCBvdXQgd2l0aCB2YWx1ZXMgb2YgY3VycmVudCBvcmRlclxyXG4gIEBtZXRob2Qgc2F2ZU9yZGVyXHJcbiAgICBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICBAZG8gb24gY2xpY2sgb24gXCJ0aWNrXCIgc2F2ZSBidXR0b24gaW4gYWxlcnRXaW5kb3cgaXQgdGFrZSBhbGwgZGF0YSBmcm9tIGFsZXJ0V2luZG93IGFuZCBzYXZlIGl0IGFzIG9yZGVyIHRvIGRiIGFuZCBjaGFuZ2UgZGF0YSBpbiBvcmRlcnMgbmF2IHRhYmxlIGlmIGl0IGlzIG5lZWRlZFxyXG4gIEBtZXRob2QgZGVsZXRlUmVjb3JkXHJcbiAgICBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICBAZG8gZGVsZXRlIHNlbGVjdGVkIHJlY29yZCBmcm9tIGRiIGFuZCBmcm9tIG5hdiB0YWJsZVxyXG4gIEBtZXRob2QgZGlzcGxheUtpdHNPbkN5Y2xlU2VsZWN0XHJcbiAgICBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICBAZG8gd2hlbiB1c2VyIHNlbGVjdCBjeWNsZSBpbiBhbGVydFdpbmRvdyBpbiBkaXNwbGF5IGFsbCBraXRzIGZyb20gdGhhdCBjeWNsZSBpbiBraXRzLWNvbnRhaW5lclxyXG4qL1xyXG5jbGFzcyBDeWNsZUNvbnRyb2xsZXJ7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIGlmKGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2UpIHJldHVybiBnLkNvbnRyb2xsZXIuQ3ljbGVzLmluc3RhbmNlO1xyXG4gICAgdGhpcy5kYW8gPSBuZXcgQ3ljbGVzREFPKCk7XHJcbiAgICB0aGlzLmluID0gbmV3IEN5Y2xlc0lucHV0KCk7XHJcbiAgICByZXR1cm4gZy5Db250cm9sbGVyLkN5Y2xlcy5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRDeWNsZXNUb05hdkJhcihlLCBjYil7XHJcbiAgICBsZXQgX3RoaXMgPSBnLkNvbnRyb2xsZXIuQ3ljbGVzLmluc3RhbmNlO1xyXG4gICAgX3RoaXMuZGFvLmRpc3BhbHlDeWNsZXMoJ1RSVUUgT1JERVIgQlkgaWQgREVTQyBMSU1JVCA/LCA/JywgW1xyXG4gICAgICAgICAgICBnLkNvbnRyb2xsZXIuQ3ljbGVzLmN5Y2xlc05hdkJhclNjcm9sbENvdW50ZXIgKiBnLkNvbnRyb2xsZXIuQ3ljbGVzLmN5Y2xlc05hdkJhckNvdW50VG9TZWxlY3QsXHJcbiAgICAgICAgICAgIGcuQ29udHJvbGxlci5DeWNsZXMuY3ljbGVzTmF2QmFyQ291bnRUb1NlbGVjdFxyXG4gICAgICAgICAgXSwgY2IpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsTmF2QmFyTGVmdChlKXtcclxuICAgIGcuQ29udHJvbGxlci5DeWNsZXMudG9TY3JvbGwgPSBzZXRJbnRlcnZhbCgoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN5Y2xlcy10YWItY29udGFpbmVyIC5jeWNsZXNcIikuc2Nyb2xsQnkoLTMsIDApLCA2KTtcclxuICB9XHJcblxyXG4gIHNjcm9sbE5hdkJhclJpZ2h0KGUpe1xyXG4gICAgZy5Db250cm9sbGVyLkN5Y2xlcy50b1Njcm9sbCA9IHNldEludGVydmFsKCgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3ljbGVzLXRhYi1jb250YWluZXIgLmN5Y2xlc1wiKS5zY3JvbGxCeSgzLCAwKSwgNik7XHJcbiAgfVxyXG5cclxuICBlbmRTY3JvbGwoZSl7XHJcbiAgICBjbGVhckludGVydmFsKGcuQ29udHJvbGxlci5DeWNsZXMudG9TY3JvbGwpO1xyXG4gICAgZy5Db250cm9sbGVyLkN5Y2xlcy50b1Njcm9sbCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUN5Y2xlKGUpe1xyXG4gICAgbGV0IF90aGlzID0gZy5Db250cm9sbGVyLkN5Y2xlcy5pbnN0YW5jZTtcclxuXHJcbiAgICB2YXIgY3ljbGVOYW1lID0gX3RoaXMuaW4udGFrZURhdGEoXCJhZGRfY1wiKTtcclxuICAgIGlmKGN5Y2xlTmFtZSAhPSBcIlwiKXtcclxuICAgICAgX3RoaXMuZGFvLmNyZWF0ZUN5Y2xlKGZhbHNlP190aGlzLmluLnRha2VEYXRhKFwiQ19JRFwiKTotMSwgY3ljbGVOYW1lLCBjeWNsZUlEID0+IHtcclxuICAgICAgICBfdGhpcy5kYW8uZGlzcGFseUN5Y2xlcygnaWQgPSA/JywgW2N5Y2xlSURdLCAoKSA9PiB7XHJcbiAgICAgICAgICBfdGhpcy5zZWxlY3RDeWNsZShlLCBjeWNsZUlEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc2VsZWN0Q3ljbGUoZSwgaWQsIGNiKXtcclxuICAgIGxldCBfdGhpcyA9IGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2U7XHJcbiAgICBpZCA9IHR5cGVvZiBpZCAhPT0gXCJ1bmRlZmluZWRcIj9pZDplLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJmb3JcIikuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgX3RoaXMuZGFvLmZpbGxDeWNsZVdpbmRvd3MoaWQsIGNiKTtcclxuICB9XHJcblxyXG4gIGVkaXRPcmRlcihlKXtcclxuICAgIGxldCBfdGhpcyA9IGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2U7XHJcbiAgICBfdGhpcy5kYW8ub3Blbk9yZGVyQ3JlYXRpbmdXaW5kb3coKTtcclxuICAgIF90aGlzLmRhby5maWxsT3JkZXJDcmVhdGluZ1dpbihwYXJzZUludChlLnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikpKTtcclxuICB9XHJcblxyXG4gIGNsb3NlT3JkZXIoZSl7XHJcbiAgICBsZXQgX3RoaXMgPSBnLkNvbnRyb2xsZXIuQ3ljbGVzLmluc3RhbmNlO1xyXG4gICAgX3RoaXMuZGFvLmNsb3NlT3JkZXJDcmVhdGluZ1dpbmRvdygpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZU9yZGVyKGUpe1xyXG4gICAgbGV0IF90aGlzID0gZy5Db250cm9sbGVyLkN5Y2xlcy5pbnN0YW5jZTtcclxuICAgIF90aGlzLmRhby5nZXRPcmRlckZyb21QYWdlKChvcmRlciwgY3VzdG9tZXIpID0+IHtcclxuICAgICAgX3RoaXMuZGFvLnNhdmVPcmRlcihvcmRlcik7XHJcbiAgICAgIF90aGlzLmRhby5zYXZlQ3VzdG9tZXIoY3VzdG9tZXIpO1xyXG4gICAgICBfdGhpcy5kYW8uY2xvc2VPcmRlckNyZWF0aW5nV2luZG93KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlLaXRzT25DeWNsZVNlbGVjdChlKXtcclxuICAgIGxldCBfdGhpcyA9IGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2U7XHJcbiAgICBfdGhpcy5kYW8uZGlzcGxheUtpdHMoX3RoaXMuaW4udGFrZURhdGEoXCJBV19jX2lkXCIpKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUN5Y2xlKGUpe1xyXG4gICAgbGV0IF90aGlzID0gZy5Db250cm9sbGVyLkN5Y2xlcy5pbnN0YW5jZTtcclxuICAgIGxldCBjeWNsZUlEID0gX3RoaXMuaW4udGFrZURhdGEoXCJDX0lEXCIpO1xyXG4gICAgX3RoaXMuZGFvLmNsZWFuQ3ljbGVXaW5kb3dzKGN5Y2xlSUQpO1xyXG4gICAgX3RoaXMuZGFvLmRlbGV0ZUN5Y2xlKGN5Y2xlSUQpXHJcbiAgfVxyXG5cclxuICBkZWxldGVSZWNvcmQoZSl7XHJcbiAgICBsZXQgX3RoaXMgPSBnLkNvbnRyb2xsZXIuQ3ljbGVzLmluc3RhbmNlO1xyXG4gICAgbGV0IHNsID0gX3RoaXMuaW4udGFrZURhdGEoXCJUYmxfU2xjdFwiKTtcclxuICAgIGxldCBkYiA9ICh7XCJvcmRlcnNcIjogbmV3IE9yZGVyVGFibGVTUUwoKSwgXCJwcm9kdWN0c1wiOiBuZXcgUHJvZHVjdFRhYmxlU1FMKCksIFwia2l0c1wiOiBuZXcgS2l0VGFibGVTUUwoKX0pW3NsWzBdXTtcclxuICAgIGxldCBkYkN5Y2xlID0gbmV3IEN5Y2xlVGFibGVTUUwoKTtcclxuXHJcbiAgICAobmV3IEN5Y2xlc091dHB1dCgpKS5pbnNlcnREYXRhKHNsWzBdWzBdLnRvVXBwZXJDYXNlKCkgKyBcIl9UYmxcIiwge2JvZHk6W1t7aWQ6IHNsWzFdfV1dfSk7XHJcbiAgICBkYi5kZWwoW3NsWzFdXSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RSZWNvcmQoZSl7XHJcbiAgICBsZXQgX3RoaXMgPSBnLkNvbnRyb2xsZXIuQ3ljbGVzLmluc3RhbmNlO1xyXG4gICAgbGV0IHNsID0gX3RoaXMuaW4udGFrZURhdGEoXCJUYmxfU2xjdFwiKTtcclxuICAgIGlmKHNsWzJdKSBzbFsyXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XHJcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgIHNsID0gX3RoaXMuaW4udGFrZURhdGEoXCJUYmxfU2xjdFwiKTtcclxuICAgIGxldCBmaWxsUHJvZmlsZSA9ICh7XCJvcmRlcnNcIjogdW5kZWZpbmVkLCBcInByb2R1Y3RzXCI6IF90aGlzLmRhby5maWxsUHJvZHVjdFByb2ZpbGUsIFwia2l0c1wiOiBfdGhpcy5kYW8uZmlsbEtpdFByb2ZpbGV9KVtzbFswXV07XHJcbiAgICBpZihmaWxsUHJvZmlsZSAhPSB1bmRlZmluZWQpIGZpbGxQcm9maWxlKHNsWzFdLCBfdGhpcy5pbi50YWtlRGF0YShcIkNfSURcIikpO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9BcnJheShlKXtcclxuICAgIGxldCBfdGhpcyA9IGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2U7XHJcbiAgICBfdGhpcy5kYW8uYWRkVG9BcnJheSguLi4oe1xyXG4gICAgICAgICAgICAgIFwiUGFpZFwiOltcIkFXX1BcIiwgW1wiXCIsIFwiXCJdXSxcclxuICAgICAgICAgICAgICBcIkRhdGVcIjpbXCJBV19QXCIsIFtcIlwiLCBcIlwiXV1cclxuICAgICAgICAgICAgfSlbZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikuZ2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIildKTtcclxuICB9XHJcblxyXG4gIHNhdmVQcm9kdWN0KGUsIGNiKXtcclxuICAgIGxldCBfdGhpcyA9IGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2U7XHJcbiAgICBsZXQgb3V0ID0gbmV3IEN5Y2xlc091dHB1dCgpO1xyXG4gICAgdmFyIHByb2R1Y3QgPSBfdGhpcy5kYW8udGFrZVByb2R1Y3RGcm9tUGFnZSgpO1xyXG4gICAgY29uc3QgaWQgPSBwcm9kdWN0W1wiaWRcIl0gKyAxO1xyXG4gICAgdmFyIGRiID0gbmV3IFByb2R1Y3RUYWJsZVNRTCgpO1xyXG4gICAgdmFyIGRiQ3ljbGUgPSBuZXcgQ3ljbGVUYWJsZVNRTCgpO1xyXG5cclxuICAgIGlmKGUucGF0aFs0XS5pZCA9PSBcImpzLXByb2R1Y3QtY291bnQtc2V0XCIpe1xyXG4gICAgICBjb25zb2xlLmxvZyhwcm9kdWN0KTtcclxuICAgICAgcHJvZHVjdC5jb3VudFtcImMta3RcIl0gPSBwcm9kdWN0LmNvdW50W1wiYy1zdFwiXSAtIHByb2R1Y3QuY291bnRbXCJjLXdoXCJdIC0gcHJvZHVjdC5jb3VudFtcImMtc2hcIl07XHJcbiAgICAgIHByb2R1Y3QuY291bnRbXCJjLWxmdFwiXSA9IHByb2R1Y3QuY291bnRbXCJjLWt0XCJdIC0gcHJvZHVjdC5jb3VudFtcImMtb3JcIl07XHJcblxyXG4gICAgICBvdXQuaW5zZXJ0RGF0YShcIlBfQ1wiLCBwcm9kdWN0LmNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkYi5zYXZlKFtwcm9kdWN0XSwgcHJvZHVjdHMgPT4ge1xyXG4gICAgICBpZihwcm9kdWN0c1swXVtcImlkXCJdICE9IGlkIC0gMSl7XHJcbiAgICAgICAgZGJDeWNsZS5sb2FkKFtwcm9kdWN0c1swXVtcImN5Y2xlSURcIl1dLCBjeWNsZXMgPT4ge1xyXG4gICAgICAgICAgaWYoY3ljbGVzWzBdKXtcclxuICAgICAgICAgICAgY3ljbGVzWzBdW1wicHJvZHVjdHNJRFwiXVtjeWNsZXNbMF1bXCJwcm9kdWN0c0lEXCJdLmxlbmd0aF0gPSBwcm9kdWN0c1swXVtcImlkXCJdO1xyXG4gICAgICAgICAgICBkYkN5Y2xlLnNhdmUoY3ljbGVzLCAoKSA9PiB7fSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgKG5ldyBDeWNsZXNPdXRwdXQoKSkuaW5zZXJ0RGF0YShcIlBfSURcIiwgcHJvZHVjdHNbMF1bXCJpZFwiXSk7XHJcbiAgICAgIH1cclxuICAgICAgX3RoaXMuZGFvLmZpbGxQcm9kdWN0c1dpbihbcHJvZHVjdHNbMF1bXCJpZFwiXV0sIGNiKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIHNhdmVLaXQoZSwgY2IsIHQpe1xyXG4gICAgbGV0IF90aGlzID0gZy5Db250cm9sbGVyLkN5Y2xlcy5pbnN0YW5jZTtcclxuICAgIHZhciBraXQgPSBfdGhpcy5kYW8udGFrZUtpdEZyb21QYWdlKCk7XHJcbiAgICBjb25zdCBpZCA9IGtpdFtcImlkXCJdICsgMTtcclxuICAgIHZhciBkYiA9IG5ldyBLaXRUYWJsZVNRTCgpO1xyXG5cclxuICAgIGRiLnNhdmUoW2tpdF0sIGtpdHMgPT4ge1xyXG4gICAgICBsZXQgb3V0ID0gbmV3IEN5Y2xlc091dHB1dCgpO1xyXG4gICAgICBpZihraXRzWzBdW1wiaWRcIl0gIT0gaWQgLSAxKXtcclxuICAgICAgICBvdXQuaW5zZXJ0RGF0YShcIktfSURcIiwga2l0c1swXVtcImlkXCJdKTtcclxuICAgICAgfVxyXG4gICAgICBfdGhpcy5kYW8uZmlsbEtpdHNXaW4oW2tpdHNbMF1bXCJpZFwiXV0sIGNiKTtcclxuICAgICAgb3V0Lmluc2VydERhdGEoXCJLX1BjUHJcIiwgTnVtYmVyKChraXRzWzBdLnBjUHJpY2UpLnRvRml4ZWQoMikpKTtcclxuICAgICAgb3V0Lmluc2VydERhdGEoXCJLX1BjV1wiLCBOdW1iZXIoKGtpdHNbMF0ucGNXZWlnaHQpLnRvRml4ZWQoMikpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlS2l0KGUpe1xyXG4gICAgbGV0IF90aGlzID0gZy5Db250cm9sbGVyLkN5Y2xlcy5pbnN0YW5jZTtcclxuICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlIC5zZWxlY3RlZFwiKSkuZm9yRWFjaChzID0+IHMuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuICAgIF90aGlzLmRhby5jbGVhbktpdFByb2ZpbGUoX3RoaXMuaW4udGFrZURhdGEoXCJDX0lEXCIpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVByb2R1Y3QoZSl7XHJcbiAgICBsZXQgX3RoaXMgPSBnLkNvbnRyb2xsZXIuQ3ljbGVzLmluc3RhbmNlO1xyXG4gICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGFibGUgLnNlbGVjdGVkXCIpKS5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG4gICAgX3RoaXMuZGFvLmNsZWFuUHJvZHVjdFByb2ZpbGUoKTtcclxuICB9XHJcblxyXG4gIHNlYXJjaChlKXtcclxuICAgIGxldCBfdGhpcyA9IGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2U7XHJcbiAgICBsZXQgdGFibGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKTtcclxuICAgIGxldCBzdHIgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIGxldCBzID0gKHN0cj09PVwiXCIpPygoKSA9PiB0cnVlKToodHIgPT4gQXJyYXkuZnJvbSh0ci5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIikpLmZpbHRlcih0ZCA9PiB0ZC5pbm5lckhUTUwuc2VhcmNoKHN0cikgPiAtMSkubGVuZ3RoID4gMCk7XHJcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0Ym9keSB0clwiKSkuZm9yRWFjaCh0ciA9PiB0ci5zdHlsZS5kaXNwbGF5ID0gcyh0cik/XCJ0YWJsZVwiOlwibm9uZVwiKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU9yZGVyRm9ybShlKXtcclxuICAgIGxldCBfdGhpcyA9IGcuQ29udHJvbGxlci5DeWNsZXMuaW5zdGFuY2U7XHJcbiAgICBsZXQga2l0cyA9IF90aGlzLmRhby5nZXRPcmRlckZyb21QYWdlKHVuZGVmaW5lZCwxKTtcclxuICAgIF90aGlzLmRhby51cGRhdGVPcmRlckZvcm0oa2l0cyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
