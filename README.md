# Hour of Power – React Native + Firebase Rewrite

This project is a complete rewrite of the original Cordova-based "Hour of Power" mobile app using **React Native (via Expo)** and **Firebase** for backend services.

## 📦 Project Structure

```
/hop_react_native
├── App.js                # App root and navigation
├── firebase.js           # Firebase configuration
├── screens/              # Screen components
│   ├── HomeScreen.js
│   ├── PrayerScreen.js
│   ├── ScheduleScreen.js
│   ├── ContactScreen.js
│   ├── BroadcastsScreen.js
│   ├── OneMinuteMessagesScreen.js
│   ├── FavoritesScreen.js
│   └── AboutUsScreen.js
```

## 🚀 Setup Instructions

1. **Install Expo CLI**
```bash
npm install -g expo-cli
```

2. **Install Project Dependencies**
```bash
cd hop_react_native
npm install
```

3. **Configure Firebase**
- Replace placeholder values in `firebase.js` with your Firebase project's config from the Firebase Console.

4. **Start the App**
```bash
expo start
```

## 🔥 Firebase Integration

- **Auth**: `firebase/auth` (currently unused, but can be added for secure features)
- **Firestore**: Prayer requests stored in a `prayer_requests` collection
- **Storage**: Can be added for videos, images
- **Notifications**: Use Expo Notifications + Firebase Messaging (optional setup)

## 📱 Screens Overview

| Screen                 | Purpose                              |
|------------------------|--------------------------------------|
| HomeScreen             | Entry point, navigation              |
| PrayerScreen           | Submit prayer requests               |
| ScheduleScreen         | Weekly program schedule              |
| ContactScreen          | Ministry contact info                |
| BroadcastsScreen       | View recorded broadcasts             |
| OneMinuteMessagesScreen| Daily inspirational content          |
| FavoritesScreen        | Saved user content                   |
| AboutUsScreen          | Mission and background               |

## 📚 Data Schema (Firestore)

### Collection: `prayer_requests`
```json
{
  "message": "Please pray for healing.",
  "createdAt": "2025-06-03T12:34:56Z"
}
```

## 📦 Deployment

### With Expo:
- Build Android APK: `eas build -p android`
- Build iOS app: `eas build -p ios` (Mac required)
- Publish OTA updates: `expo publish`

## ✅ Future Improvements

- Add Firebase Auth (email, Google, anonymous)
- Enable push notifications via Expo/Firebase
- Link audio/video content from Firebase Storage or YouTube/Vimeo
- Add localization (Dutch, English)#   H O P _ p l a t f o r m  
 #   H O P _ p l a t f o r m  
 # HOP_mobile_app
# HOP_mobile_app
