function renderChatContentTitle(str) {
  document.getElementById('chat-content-title').innerText = str
}
function genOtherMsg(msg) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'msg-wrap-other');
  // set avatar
  const avatarBlock = document.createElement('img');
  avatarBlock.setAttribute('src', msg.avatar);
  avatarBlock.setAttribute('data-username', msg.username);
  avatarBlock.setAttribute('data-tapmsg', msg.tapMsg);
  avatarBlock.setAttribute('class', 'avatar-common');
  wrapper.appendChild(avatarBlock);
  // set right wrap
  const rightBlock = document.createElement('div');
  rightBlock.setAttribute('class', 'msg-other-right')
  // set name
  const nameBlock = document.createElement('div')
  nameBlock.innerText = msg.username;
  nameBlock.setAttribute('class', 'msg-username');
  rightBlock.appendChild(nameBlock);
  if (msg.type === 'img') {
    const imgBlock = document.createElement('img');
    imgBlock.setAttribute('src', msg.content);
    rightBlock.appendChild(imgBlock);
  } else if (msg.type === 'text') {
    const textBlock = document.createElement('div');
    textBlock.setAttribute('class', 'msg-other');
    rightBlock.appendChild(textBlock);
  }
  wrapper.appendChild(rightBlock);
  return wrapper;
}
function genSelfMsg(msg) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'msg-wrap-self');
  if (msg.type === 'img') {
    const imgBlock = document.createElement('img');
    imgBlock.setAttribute('src', msg.content);
    wrapper.appendChild(imgBlock);
  } else if (msg.type === 'text') {
    const textBlock = document.createElement('span');
    textBlock.innerText = msg.content;
    wrapper.appendChild(textBlock);
  }
  const avatarBlock = document.createElement('img');
  avatarBlock.setAttribute('src', msg.avatar);
  avatarBlock.setAttribute('data-username', msg.username);
  avatarBlock.setAttribute('data-tapmsg', msg.tapMsg);
  avatarBlock.setAttribute('class', 'avatar-common');
  wrapper.appendChild(avatarBlock);
  return wrapper;
}
function genUserMsgDomByType(msg) {
  let wrapper;
  if (msg.username === currentUser) {
    wrapper = genSelfMsg(msg);
  } else {
    wrapper = genOtherMsg(msg);
  }
  return wrapper;
}
function genTimeMsgDom (msg) {
  const wrapper = document.createElement('div');
  wrapper.innerText = msg.content;
  wrapper.setAttribute('class', 'msg-system-timestamp');
  return wrapper;
}
function genTapMsgDom (msg) {
  const wrapper = document.createElement('div');
  wrapper.innerText = msg.content;
  wrapper.setAttribute('class', 'msg-system-tap');
  return wrapper;
}
function renderChatContent(msgList) {
  const domList = msgList.map(msg => {
    let domBlock;
    if (msg.type === 'timestamp') {
      domBlock = genTimeMsgDom(msg);
    } else {
      domBlock = genUserMsgDomByType(msg);
    }
    return domBlock;
  })
  const chatContentWrap = document.getElementById('chat-content')
  domList.forEach(msgDom => {
    chatContentWrap.appendChild(msgDom);
  })
}
function bindAvatarEvent() {
  const avatars = document.querySelectorAll('.avatar-common');
  avatars.forEach(avatar => {
    avatar.addEventListener('click', handleAvatarClickWrapper);
  })
}
function handleAvatarClickWrapper(e) {
  if (window.doubleTap) {
    // 开始执行
    if (!window.lock) {
      window.lock = true;
      setTimeout(() => {
        window.lock = false;
      }, 10000);
      return handleAvatarClick.call(this, e);
    } else {
      const answer = window.confirm('撤回刚才这次拍一拍?');
      console.log('answer', answer)
      if (answer) {
        window.lock = false;
        clearLastTap()
      }
    }
  } else {
    window.doubleTap = true;
    setTimeout(() => {
      window.doubleTap = false;
    }, 500);
  }
}
function clearLastTap() {
  const msgWrap = document.getElementById('chat-content');
  const lastTap = document.querySelectorAll('.msg-system-tap');
  msgWrap.removeChild(lastTap[lastTap.length - 1]);
}
function handleAvatarClick(e) {
  const { username, tapmsg } = e.target.dataset;
  let showText = ''
  if (username === currentUser) {
    showText = '我拍了拍自己';
  } else {
    showText = `我拍了拍"${username}"`
  }
  if (tapmsg) {
    showText += `说${tapmsg}`
  }
  addNewSystemMsg(showText)
}
function addNewSystemMsg(msgContent) {
  const currentMsgWrap = document.getElementById('chat-content');
  const msgObj = {
    username: 'system',
    type: 'tap',
    content: msgContent
  }
  const msgDom = genTapMsgDom(msgObj);
  currentMsgWrap.appendChild(msgDom);
}
function setup() {
  window.currentUser = 'wilson';
  renderChatContentTitle('鑫仔亲友团(7)')
  const msgList = [
    {
      avatar: 'https://user-images.githubusercontent.com/23159565/127432393-8171b70d-cc4a-4454-adab-1dcb010f4f52.jpeg',
      username: '卷卷星',
      type: 'img',
      content: 'https://user-images.githubusercontent.com/23159565/127431269-a33af7aa-974f-4ab8-8dc4-4d7fc3a50eab.png',
      tapMsg: '来钓鱼🎣'
    },
    {
      username: 'system',
      type: 'timestamp',
      content: '11:05'
    },
    {
      avatar: 'https://user-images.githubusercontent.com/23159565/127432445-57fa5223-9002-4dc1-b557-1ec2710f65ee.jpeg',
      username: 'wilson',
      type: 'text',
      content: '开始做拍一拍',
      tapMsg: ''
    }
  ]
  renderChatContent(msgList);
  bindAvatarEvent();
}
setup()