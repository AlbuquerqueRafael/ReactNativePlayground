package com.pac.upload;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import java.util.Date;
import java.nio.charset.Charset;

import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(value = "/upload")
@CrossOrigin(origins = "*")
public class UploadController {
  Map<String, String> response = new HashMap<String, String>();
  private static final Charset UTF_8 = Charset.forName("UTF-8");
  private static final Charset ISO = Charset.forName("ISO-8859-1");
 
  @RequestMapping(value = "/", method = RequestMethod.POST)
  public Map<String, String> login (String title, MultipartFile photo, String image_data,
                                    HttpServletRequest request) {
   
    byte[] imageByte;
    String fileName = (new Date()).toString();
    fileName = fileName.replace(' ', '_');
    fileName = fileName.replace(':', '_');

    try {
        //FileUtils.writeByteArrayToFile(new File(fileName + ".png"), photo.getBytes());

        imageByte = Base64.decodeBase64(image_data);
        FileUtils.writeByteArrayToFile(new File(fileName + ".png"), imageByte);
    } catch (Exception e) {
        e.printStackTrace();
        System.out.println("error");
    }
	return response;
  }
}