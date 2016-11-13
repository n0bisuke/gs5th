voice = '保護者会日時11月14日場所3-4教室'
split1 = voice.split('日時')
split2 = split1[1].split('場所')
title = split1[0]
date = split2[0]
place = split2[1]
print('タイトル：'+title+'\n'+'日時：'+date+'\n'+'場所：'+place)