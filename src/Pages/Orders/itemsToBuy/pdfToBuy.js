




      // id: provItem!._id,
      // size: provItem!.size,
      // color: provItem!.color!,
      // cantToBuy: quantityToBuy!,


import { jsPDF } from "jspdf";




export const EnvoiceToBuy = (listToBuy,id) => {

  let data = [];
  // console.log(listToBuy);

  listToBuy.map(item => {
    data.push({
      Cantidad: item.cantToBuy.toString(),
      Talle: item.size.toString(),
      Color: item.color,
      Faltante: ' '
    })
  })

  console.log(data);


  const Myheaders = [
    {
      id: "Cantidad",
      name: "Cantidad",
      prompt: "Cantidad",
      width: 33,
      align: "center",
      padding: '0'
    },
    {
      id: "Talle",
      name: "Talle",
      prompt: "Talle",
      width: 25,
      align: "center",
      padding: '0'
    },

    {
      id: "Color",
      name: "Color",
      prompt: "Color",
      width: 30,
      align: "center",
      padding: '0'
    },

    {
      id: "Faltante",
      name: "Faltante",
      prompt: "Faltante",
      width: 30,
      align: "center",
      padding: '0'
    }
  ];


  const doc = new jsPDF();



  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold');
  doc.text('Orden :', 10, 25);


  doc.setFont('helvetica', 'normal');
  //todo: Tengo que agregar el lugar en orders/selected 
  doc.text(id, 30, 25);
  
  doc.setFontSize(15)
  doc.table(10, 30, data, Myheaders, { autoSize: false, margins: { right: 10, left: 10, top: 40, bottom: 40 } });

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold');
  doc.text('Orden :', 110, 25);

  doc.setFont('helvetica', 'normal');
  //todo: Tengo que agregar el lugar en orders/selected 
  doc.text(id, 130, 25);
  doc.setFontSize(15)


  doc.table(110, 30, data, Myheaders, { autoSize: false, margins: { right: 10, left: 10, top: 40, bottom: 40 } });
  

  doc.save("a4.pdf")

  doc.autoPrint();

  return doc



}



