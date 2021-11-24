// RTC 客户端实例对象
let rtcClient;

// 直播观众端实例
let audienceClient;

/**
 * 初始化 rtcClient
 */
 const initRTCClient = (e) => {
  if (!isInitIM || !isConnected) {
    alert('请确保已经初始化完 IM 、并已连接成功');
    return;
  }
  rtcClient = RongIMLib.installPlugin(window.RCRTC.installer, {
    mediaServer: Config.mediaServer || undefined,
    timeout: 30 * 1000,
    logLevel: 0,
  });
  // 获取直播观众端实例
  audienceClient = rtcClient.getAudienceClient();

  e.nextElementSibling.style.color = '#09f';
};

/**
 * 注册 peerConnection 上报监听
 */
 const registerPeerReportListener = () => {
	audienceClient.registerReportListener({
		onICEConnectionStateChange(state) {
			console.log('onICEConnectionStateChange:', state);
		},
		onConnectionStateChange(state) {
			console.log('onConnectionStateChange:', state);
		},
    // 音视频质量数据监听
		onStateReport(reports) {
			console.log(`质量数据: `, reports);
		}
	});
};

/**
 * 观众端注册 peerConnection 上报事件、track 事件
 */
const initAudienceListener = (e) => {
  if (!audienceClient) {
    alert('请先完成 RTC 初始化，获取观众客户端实例');
    return;
  }
  registerPeerReportListener();
  audienceClient.registerTrackEventListener({
    onTrackReady (track) {
      playTrack(track, true);
    },
  });

  e.nextElementSibling.style.color = '#09f';
};

/**
 * 订阅主播端的 liveUrl
 */
const subscribeLive = async () => {
  const liveUrl = document.querySelector('#liveurl').value;
  if (!liveUrl) {
    alert('请输入 liveUrl');
    return;
  }
  
  if (!audienceClient) {
    alert('请先完成 RTC 初始化，获取观众客户端实例');
    return;
  }

  const { code, tracks } = await audienceClient.subscribe(liveUrl, window.RCRTC.RCLivingType.VIDEO, window.RCRTC.RCMediaType.AUDIO_VIDEO);
  if (code === RCRTC.RCRTCCode.SUCCESS) {
    appendVideoEl(tracks);
  } else {
    alert(`订阅失败: ${code}`);
  }
};

/**
 * 往页面中插入 video 元素
 * @param {window.RCRTC.RCTrack[]} tracks 
 */
 const appendVideoEl = (tracks) => {
  tracks.forEach((track) => {
    if (track.isVideoTrack()) {
      const node = document.createElement('div');
      const tempHtml = `<span class="res-tag">${track.getTrackId()}</span>
                        <video id="rc-video-${track.getTrackId()}"></video>`;
      node.innerHTML = tempHtml;
      const { userId } = window.RCRTC.helper.parseTrackId(track.getTrackId());
      node.classList = `video-wrap video-wrap-${userId}`;
      document.getElementById('rong-video-box').appendChild(node);
    }
  });
};

/**
 * 播放资源
 * @param {window.RCRTC.RCTrack} track 音轨、视轨
 * @param {boolean} playAudio 是否播放音频，(本端发布的音频静音，值为 false)
 * @returns 
 */
 const playTrack = (track, playAudio) => {
  // 播放视频
	if (track.isVideoTrack()) {
		const node = document.getElementById('rc-video-' + track.getTrackId());
		track.play(node);
		return;
	}

  // 播放音频
	if (playAudio) {
		track.play();
	}
};