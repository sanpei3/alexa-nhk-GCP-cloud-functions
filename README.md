Alexa 用の「NHKニュース(15分以上版, 非公式)」フラッシュニュースのソースです。

index.js : Google Cloud Functionsのソース

当初はAWS lambdaで作成しましたが、lambdaがコールドスタート時には
Alexa skillのタイムアウトに達してしまうため、Cloud Functionsで
ほぼ同じコードで対応しました。
