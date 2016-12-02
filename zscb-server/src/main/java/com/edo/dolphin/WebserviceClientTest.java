package com.edo.dolphin;

import java.lang.reflect.Proxy;
import java.util.Properties;

import org.apache.ws.security.handler.WSHandlerConstants;
import org.codehaus.xfire.XFireFactory;
import org.codehaus.xfire.client.Client;
import org.codehaus.xfire.client.XFireProxy;
import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.security.wss4j.WSS4JOutHandler;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;
import org.codehaus.xfire.util.dom.DOMOutHandler;

import com.edo.dolphin.constant.APIConstant;

public class WebserviceClientTest {

    private WSS4JOutHandler wsOut;
    private Service srvcModel;
    private Client client;

    public void testClient() throws Exception {
        srvcModel = new ObjectServiceFactory().create(AppQueryService.class);
        XFireProxyFactory factory = new XFireProxyFactory(XFireFactory.newInstance().getXFire());
        String URL = APIConstant.DOLPHIN_API_URL;
//        URL = "http://localhost:8080/dolphin/serviceEnc";

        try {
            AppQueryService srvc = (AppQueryService) factory.create(srvcModel, URL);
            client = ((XFireProxy) Proxy.getInvocationHandler(srvc)).getClient();
            Properties properties = new Properties();
            properties.setProperty(WSHandlerConstants.USER, "ws_security");

            properties.setProperty(WSHandlerConstants.ACTION, WSHandlerConstants.ENCRYPT);
            properties.setProperty(WSHandlerConstants.ENC_PROP_FILE, "com/edo/dolphin/outsecurity_enc.properties");

            wsOut = new WSS4JOutHandler(properties);
            client.addOutHandler(new DOMOutHandler());
            client.addOutHandler(wsOut);
            String xm = "王轶贤";
            String zjhm = "31022919840724043X";
            String uname = APIConstant.DOLPHIN_LOGIN_ID;
            String password = APIConstant.DOLPHIN_LOGIN_PASSWORD;
            String licenseFile = "15033333333";
            String[] param = new String[] { "123" };
            String res = srvc.queryZrrKxHonest(xm, zjhm, uname, password, param, licenseFile);
            System.out.println(res);
            client.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        try {
//            AppQueryService service = null;
//            ObjectServiceFactory oClass = new ObjectServiceFactory();
//            Service serviceModel = oClass.create(AppQueryService.class);
//            // 获取XFire的代理对象
//            XFire xfire = XFireFactory.newInstance().getXFire();
//            XFireProxyFactory factory = new XFireProxyFactory(xfire);
//            service = (AppQueryService) factory.create(serviceModel, APIConstant.DOLPHIN_API_URL);
//
//            String xm = "王轶贤";
//            String zjhm = "31022919840724043X";
//            String uname = APIConstant.DOLPHIN_LOGIN_ID;
//            String password = APIConstant.DOLPHIN_LOGIN_PASSWORD;
//            String[] param = new String[] { "123" };
//            String licenseFile = "15033333333";
//            String resultJson = service.queryZrrKxHonest(xm, zjhm, uname, password, param, licenseFile);
//            System.out.println(resultJson);
            WebserviceClientTest t = new WebserviceClientTest();
            t.testClient();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
