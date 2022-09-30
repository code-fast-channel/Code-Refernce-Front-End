import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '@app/shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { NgxImageCompressService, DOC_ORIENTATION } from 'ngx-image-compress';

@Component({
  selector: 'form-profile-pic',
  templateUrl: './form-profile-pic.component.html',
  styleUrls: ['./form-profile-pic.component.css']
})
export class FormProfilePicComponent implements OnInit, OnDestroy {

  @ViewChild("tempImg") tempImgRef : ElementRef
  private unsubscribe$ = new Subject();

  @Output() picChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() form: FormGroup
  @Input() isViewMode = false

  public isLoading = false
  public isCompressing = false

  public profilePicPath
  public srcOrientation
  public imgOrgOrientation
  public imgBeforeCompress
  public imgAfterCompress
  public orgImageSize
  public compressedImageSize

  maxSizeForUserProfilePic = 100 * 1000 //100Kb
  private userId = null

  constructor(
    public sharedService: SharedService,
    public imageCompress: NgxImageCompressService
  ) { }

  ngOnInit() {

    if (this.form) {
      this.userId = this.sharedService.serializeMongoObjectId(this.form.controls["_id"].value)
    }
    else {
      this.userId = this.sharedService.serializeMongoObjectId(this.sharedService.CurrentUserId())
    }

    this.loadProfilePic()

  }

  loadProfilePic() {
    this.profilePicPath = environment.ftpUrl + this.sharedService.getUserProflePicDirectory() + this.userId + ".png"
    this.profilePicPath = this.profilePicPath + "?update=" + Date.now()
  }

  selectPic() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      
      this.orgImageSize = this.compressedImageSize = this.imageCompress.byteCount(image)
      this.imgOrgOrientation = orientation

      this.srcOrientation = orientation

      if( orientation <= 1 && this.orgImageSize < this.maxSizeForUserProfilePic){
        this.uploadPicToServer(image)
      }
      else{
        this.fixImageOrientation(image);
      }
    });
  }

  fixImageOrientation(srcBase64Image) {
    this.tempImgRef.nativeElement.src = srcBase64Image;
  }

  tempImageOnLoad(){
    var width = this.tempImgRef.nativeElement.width,
        height = this.tempImgRef.nativeElement.height;

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

    // set proper canvas dimensions before transform & export
    if (4 < this.srcOrientation && this.srcOrientation < 9) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    // transform context before drawing image
    switch (this.srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height, width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }

    // draw image
    ctx.drawImage(this.tempImgRef.nativeElement, 0, 0);

    let resultBase64Image = canvas.toDataURL();
    this.compressImage(resultBase64Image);
  } 

  compressImage(image, compressionRation = 50, compressionQuality = 50) {
    this.isCompressing = true
    this.imageCompress.compressFile(image, this.imgOrgOrientation, compressionRation, compressionQuality).then(
      result => {

        this.imgAfterCompress = result
        this.compressedImageSize = this.imageCompress.byteCount(result)

        if (this.compressedImageSize > this.maxSizeForUserProfilePic) {
          this.compressImage(this.imgAfterCompress, compressionRation, compressionQuality)
        }
        else {
          this.uploadPicToServer(result)
        }
      }
    );
  }
 

  uploadPicToServer(file) {
    this.isCompressing = false
    this.isLoading = true

    this.sharedService.uploadBytes("profilePic", file, this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          this.isLoading = false
          this.sharedService.openSnackBar("User Profile pic uploaded successfully", "x", "success")
          this.loadProfilePic()
          this.picChange.emit(true)
        },
        (error) => {
          this.isLoading = false
          console.log("Error uploaded not successfully")
          console.log(error)
          this.sharedService.openSnackBar("Sorry! User Profile pic not get uploaded.", "x", "fail")
          this.picChange.emit(false)
        }
      )
  }

  dontUpload() {
    this.isLoading = false
    this.isCompressing = false
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
