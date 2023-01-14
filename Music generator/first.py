#!/usr/bin/env python
# coding: utf-8

# In[51]:


from pydub import AudioSegment
from pydub.playback import play
import random


# In[52]:


c = AudioSegment.from_file("notes/c.mp3", format= "mp3")
d = AudioSegment.from_file("notes/d.mp3", format= "mp3")
e = AudioSegment.from_file("notes/e.mp3", format= "mp3")
f = AudioSegment.from_file("notes/f.mp3", format= "mp3")
g = AudioSegment.from_file("notes/g.mp3", format= "mp3")
a = AudioSegment.from_file("notes/a.mp3", format= "mp3")
b = AudioSegment.from_file("notes/b.mp3", format= "mp3")
c1 = AudioSegment.from_file("notes/c1.mp3", format= "mp3")


# In[53]:


c=c.speedup(playback_speed=2.9)
d=d.speedup(playback_speed=2.9)
e=e.speedup(playback_speed=2.9)
f=f.speedup(playback_speed=2.9)
g=g.speedup(playback_speed=2.9)
a=a.speedup(playback_speed=2.9)
b=b.speedup(playback_speed=2.9)
c1=c1.speedup(playback_speed=2.9)


# In[54]:


print(c.duration_seconds)


# In[ ]:


play(c)


# In[50]:


my_list = [c,d,e,f,g,a,b,c1]
my_list_length = len(my_list)
for i in range(5):
    
    random_index = random.randint(0, my_list_length - 1)
    random_element = my_list[random_index]
    play(random_element)


# In[ ]:





# In[ ]:




