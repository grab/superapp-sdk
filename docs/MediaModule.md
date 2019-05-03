# What is MediaModule ?

`MediaModule` This module will open a media player


## Methods


### 1. To play DRM content
```javascript
MediaModule.playDRMContent(data)
```

#### Params
Name | Type | Description
 --- | --- | ---
data  | VideoData  | Response from backend

#### VideoData

Name | Type | Description
 --- | --- | ---
content | url | Content URL for playback
certificate | url | DRM certificate URL
license | url | DRM licence URL
titleId | string | Playback item identifier

#### Return type
A data stream emitting events on the video playback status.

Name | Type | Description
 --- | --- | ---
type | string | Type of the event. Refer to the event types
titleId | string | Playback item identifier
length | int | Length of the video (in seconds)
position | int | The current position of the video (in seconds)

The types of events are as follows:

EventType | Description
 --- | ---
START_PLAYBACK | Emitted when the video starts playing
STOP_PLAYBACK | Emitted when the video stops playing
PROGRESS_PLAYBACK | Emitted every 10 seconds

#### Code sample
```javascript
import { MediaModule } from '@grabjs/superapp-sdk';

const mediaModule = new MediaModule();

try {
  // This is for backward compatibility, since older app
  // versions do not support this syntax.
  mediaModule
    .playDRMContent({
      content: 'content-url-here',
      certificate: 'certificate-url-here',
      license: 'license-url-here',
      titleId: 'title-id-here'
    })
    .subscribe({
      next: ({ result, error, status_code }) => {
        if (!!result) {
          const { type, titleId, length, position } = result;

          // Do what we want with the data here.
        } else if (!!error) {
          // Handle error here.
        }
      },
      complete: () => {
        // Completion logic here when the stream stops.
      }})
} catch (e) {
  // Fallback to old way to ensure the video still plays.
}
```

#### Response example
```json
{
    status_code: 200
    result : {
        "type": "PROGRESS_PLAYBACK",
        "titleId": "2o23asdf1asd123",
        "length": 3600,
        "position": 1800,
    }
}
```