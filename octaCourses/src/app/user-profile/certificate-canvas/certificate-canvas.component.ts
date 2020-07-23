import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-certificate-canvas',
  templateUrl: './certificate-canvas.component.html',
  styleUrls: ['./certificate-canvas.component.css']
})
export class CertificateCanvasComponent implements OnInit {

  // the certificateData object is just for testing representing the data required for the certificate
  // and should be removed after the work is done
  certificateData: any = {
    studentName: "Alaa Ahmed",
    courseName: "Angular 9",
    issueDate: "1/1/2020",
    certificateId: 777777777
  }

  // its important certificate matches the variable name in the template
  // we use @ViewChild decorator to hold a reference to the canvas int the html
  @ViewChild('certificate')
  certificate: ElementRef<HTMLCanvasElement>;

  // its important downloadBtn matches the variable name in the template
  // we use @ViewChild decorator to hold a reference to the downloadBtn in the html
  @ViewChild('downloadBtn')
  downloadBtn: ElementRef<HTMLAnchorElement>;

  // creating a context to render the canvas elements
  public context: CanvasRenderingContext2D;

  // creating image object to represent the certificate design
  courseCertificate = new Image(792, 612);

  constructor() { 
    // initializing the image object with the source of the image
    this.courseCertificate.src = "../assets/img/certificate_nodata.jpg"; 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // making the canvas width equal to the width specified in the css file
    this.certificate.nativeElement.width = this.certificate.nativeElement.scrollWidth

    // making the canvas height equal to the height specified in the css file
    this.certificate.nativeElement.height = this.certificate.nativeElement.scrollHeight

    // making a 2d context that we will use to draw the certificate and the data on it
    this.context = this.certificate.nativeElement.getContext('2d');

    // specifying the font style
    this.context.font = "25px Arial";

    // the onload function below is used to load the certificate design 
    // after the certificate is loaded we can continue drawing/putting data on top of it
    this.courseCertificate.onload = ()=>{

      // disabling the smoothing effect that makes the certificate looks a bit softer
      this.context.imageSmoothingEnabled = false;

      // drawing the certificate design on our context 
      this.context.drawImage(this.courseCertificate, 0,0, 792, 612, 0, 0, 792, 612);

      // specifying the font color
      this.context.fillStyle = "#F38137"

      // alligning text around the center of the pixel that the context start drawing at
      this.context.textAlign = "center";

      // writing the student name on the certificate
      this.context.fillText(this.certificateData.studentName, 396, 306);

      // writing the course name on the certificate
      this.context.fillText(this.certificateData.courseName, 396, 375);

      // changing the font style
      this.context.font = "17px Arial";

      // writing the certificate issue date on the certificate
      this.context.fillText(this.certificateData.issueDate, 94, 548);

      // writing the certificate id on the certificate
      this.context.fillText(this.certificateData.certificateId, 397, 548);
    }
  }

// download certificate function
downloadCert(){
  // converting the canvas into a downloadable image
  // toDataURL takes the type of the image and the quality (1 is highest, 0 is the lowest)
  // the quality if not specified it will be 96 dpi
  // if the type is not specified the type will be png
  let imageBits = this.certificate.nativeElement.toDataURL("image/jpeg", 1.0);

  // binding the image to the downloadBtn aka anchor link
  this.downloadBtn.nativeElement.href= imageBits;
}

}
