package com.occupappmovil2;

import com.google.firebase;
import java.lang.Object;
import android.app.Notification;
import android.app.NotificationCompat;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.Context;
import com.google.firebase.messaging.RemoteMessage;
import java.lang.Object.Context;

public class NotificationService extends FirebaseMessagingService {

    private NotificationManager manager;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        // Notification notification = new NotificationCompat.Builder(this)
        //         .setContentTitle(remoteMessage.getNotification().getTitle())
        //         .setContentText(remoteMessage.getNotification().getBody())
        //         .setSmallIcon(R.mipmap.ic_launcher)
        //         .build();
        // NotificationManagerCompat manager = NotificationManagerCompat.from(getApplicationContext());
        // manager.notify(123, notification);
       
       
        // manager = (NotificationManager)this.getSystemService(Context.NOTIFICATION_SERVICE);

        // PendingIntent launchIntent;
        // Intent appIntent = new Intent(this, Principal.class);

        // Notification.Builder msgMaker = new Notification.Builder(this)
        //         // .setSmallIcon(R.drawable.jobs)
        //         .setContentTitle(remoteMessage.getNotification().getTitle())
        //         .setContentText(remoteMessage.getNotification().getBody());


        // msgMaker.setStyle(new Notification.BigTextStyle().bigText(remoteMessage.getNotification().getBody()));
        // msgMaker.setContentIntent(launchIntent);
        // msgMaker.setDefaults(Notification.DEFAULT_ALL);
        // msgMaker.setAutoCancel(true);
        // manager.notify(123, msgMaker.build());

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, "channel_id")
               .setContentTitle(remoteMessage.getNotification().getTitle())
               .setContentText(remoteMessage.getNotification().getBody())
               .setPriority(NotificationCompat.PRIORITY_DEFAULT)
               .setStyle(new NotificationCompat.BigTextStyle())
            //    .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
               .setSmallIcon(R.mipmap.ic_launcher)
               .setAutoCancel(true);

        NotificationManager notificationManager =
               (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.notify(0, notificationBuilder.build());

    }
}