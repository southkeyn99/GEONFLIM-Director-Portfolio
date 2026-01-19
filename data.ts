import { Project, ProjectCategory } from './types';

export const DIRECTOR_INFO = {
  name: "남궁건",
  nameEn: "NamGung Geon",
  title: "Film Director & Visual Artist",
  phone: "010-8284-6424",
  email: "southkeyn99@naver.com",
  instagram: "https://www.instagram.com/n_geon",
  youtube: "https://www.youtube.com/@소질소",
  adPortfolio: "https://www.youtube.com/@남궁건-광고-포폴/shorts",
  bio: "전통적인 영화 문법과 최신 AI 기술을 결합하여 새로운 시각적 경험을 설계합니다. 명필름 단편스쿨 수료 및 다수의 독립영화제 수상 경력을 바탕으로, 타협하지 않는 서사와 미학을 추구하며 관객에게 깊은 여운을 남기는 비주얼 스토리텔링을 연구합니다.",
  profileImageUrl: "https://drive.google.com/file/d/1KC4WwDiTCI61k7ePdIj6iRoF4eDmQAWY/view?usp=share_link"
};

export const PROJECTS: Project[] = [
  // --- DIRECTING ---
  {
    id: 'd1',
    category: ProjectCategory.DIRECTING,
    title: '아부지',
    titleEn: 'Panic Disorder',
    year: '2025',
    role: 'Director / Writer',
    genre: 'Drama, Thriller',
    runtime: '27min 20sec',
    aspectRatio: '1.85:1',
    posterUrl: 'https://drive.google.com/file/d/1fIbdw1dSNKyyWT4EV9rP6op-vsJnDDgX/view?usp=share_link',
    synopsis: `어릴적 아버지의 폭력으로 집을 나온 이후, 공황장애를 얻게 된 현수. 
20년만에 누나의 부탁으로 치매에 걸린 아버지를 돌보게 된다.`,
    awardsList: [
      '24년 명필름 단편스쿨 수료작',
      '제 3회 UFO 영화제 초청상영',
      '제 4회 경기도예술영화제 대상'
    ],
    stillPhotos: [
      'https://drive.google.com/file/d/1UQ7MLFAol5oGzx194FkiwXu9iDBbgU8D/view?usp=sharing',
      'https://drive.google.com/file/d/1pMRDjIdPdYbtS2k3mtdtdnbWA_ZRaBlA/view?usp=sharing',
      'https://drive.google.com/file/d/1_fdg9qMJjNKVYSf45J0umlAC4qJ5cYVO/view?usp=sharing',
      'https://drive.google.com/file/d/1BEEt1b905J-tTIdnpq_1JradTYTTheGU/view?usp=sharing',
      'https://drive.google.com/file/d/1c4YXXdzakITg8GMGkBe7Y366LSCK2c3r/view?usp=sharing',
      'https://drive.google.com/file/d/1cFoMS1CAbjDNRMn8oBBZ1NZ-bAXUrnP0/view?usp=sharing',
      'https://drive.google.com/file/d/1DPauWo5EfZVZrd9X8mnggoJgF9N87xNu/view?usp=sharing',
      'https://drive.google.com/file/d/1DCBnqidn9i183w3qHiyGAbbPdWxZpKow/view?usp=sharing',
      'https://drive.google.com/file/d/1IWGRpM7FLVkIFGKdpaylpWQ-CmYRzdjV/view?usp=sharing',
      'https://drive.google.com/file/d/1Y-tTw4070eUQQYXgiLRQK8iDx8iL7bSv/view?usp=sharing',
      'https://drive.google.com/file/d/1fIIv35xD4EkhNfk4RuSZR9dLPH5DAgu0/view?usp=sharing',
      'https://drive.google.com/file/d/1FWGixIm2MQ98MWpmcUSOEtBQjjpsVVl-/view?usp=sharing',
      'https://drive.google.com/file/d/1bm4drWLGcGmxZ9GOSBvZtBCVmB8FEbHs/view?usp=sharing',
      'https://drive.google.com/file/d/1wPG19lKi8wxDh6gbnY98CoqM86nuJekI/view?usp=sharing',
      'https://drive.google.com/file/d/1dgZXTs7EnCD6rE-lk2uQqDLdg4r1kVs9/view?usp=sharing'
    ]
  },
  {
    id: 'd2',
    category: ProjectCategory.DIRECTING,
    title: '마지막 명령',
    titleEn: 'The Last Command',
    year: '2025',
    role: 'Director / Writer',
    isAI: true,
    genre: 'SF',
    runtime: '4min 32sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/18HQGrUhARjK7UTVnQyRi2GKvLzFY3KhX/view?usp=share_link',
    synopsis: "AI가 탑재된 전투기 조종사 노아 브릭스는 기체 이상으로 도심 추락 위기에 처한다. 수백 명의 민간인을 살리기 위해, AI가 그의 희생을 요구한다",
    awardsList: [
      '제 5회 금천패션영화제 경쟁작',
      '제 3회 죽서 AI 영화제 장려상 수상'
    ]
  },
  {
    id: 'd4',
    category: ProjectCategory.DIRECTING,
    title: '친절한 바바야가',
    titleEn: 'The Kind Baba Yaga',
    year: '2024',
    role: 'Director / Writer',
    isAI: true,
    genre: 'Horror, Drama',
    runtime: '4min 32sec',
    aspectRatio: '16:9',
    posterUrl: 'https://drive.google.com/file/d/1cygxLKvfrOUSeQZmUO57aHYhwBJBx5Uu/view?usp=share_link',
    synopsis: "처음 할머니를 만나러 간 소년은 엄마에게 들은 마귀할멈 ‘바바야가’ 이야기 때문에 무서운 악몽을 꾼다. 하지만 실제로 만난 할머니는 다정하고 따뜻한 모습으로 소년을 맞이한다.",
    stillPhotos: [
      'https://drive.google.com/file/d/1YXPDcB4iVGsuiRtcLyx2EUhtHrQT53jr/view?usp=sharing',
      'https://drive.google.com/file/d/1BdeT6IU23zz9Hfv7oKtEZa_aK4rwarIn/view?usp=sharing',
      'https://drive.google.com/file/d/1KoHFdyfKajUVfXB9bvmCPdgrZPsQSFjw/view?usp=sharing',
      'https://drive.google.com/file/d/1k6mWWO4Q-eFHD3_N7LHX5f4TjFIZc_oZ/view?usp=sharing',
      'https://drive.google.com/file/d/1cWt6fT3UyYRu3He8HBmc7qft4VWd-Lya/view?usp=sharing',
      'https://drive.google.com/file/d/1LIbWANoQjXEWQKiNA1LtgJ1kF76atpVN/view?usp=sharing',
      'https://drive.google.com/file/d/1NYXg0ZHG4tWPQrXxyoqI8-CPHqsCt5V-/view?usp=sharing',
      'https://drive.google.com/file/d/1txGOnscqEEw__b3uZ02e758I2e_dsjB3/view?usp=sharing',
      'https://drive.google.com/file/d/1078NKv-vlstSvPy2pa3d-fD5yWN5VhRT/view?usp=sharing',
      'https://drive.google.com/file/d/1Cx8JDEyBs-997fPKwmmtSG6YSWXQqswV/view?usp=sharing',
      'https://drive.google.com/file/d/1xTIddT-udyF2XHSXZl71bbCq5sWMRW25/view?usp=sharing',
      'https://drive.google.com/file/d/1JUxa7DopJjm0pA2f-6q8emjAZqnamJT2/view?usp=sharing',
      'https://drive.google.com/file/d/1CEduH-qWxZi86N-2JgTAVe-eYSphC23j/view?usp=sharing',
      'https://drive.google.com/file/d/1JA6SqjQJPWoBBEXTc5_0p-T6aIj54lRo/view?usp=sharing',
      'https://drive.google.com/file/d/1qUOs26LH6m_SCcFNftm-I9j3oESoYnGc/view?usp=sharing'
    ]
  },
  {
    id: 'd3',
    category: ProjectCategory.DIRECTING,
    title: '도애의 시간',
    titleEn: 'Minmotion Syndrome',
    year: '2024',
    role: 'Director / Writer',
    genre: 'Fantasy, Thriller',
    runtime: '20min 10sec',
    aspectRatio: '2:1',
    posterUrl: 'https://drive.google.com/file/d/1R6YheFAS7qbKeM0PWPcKincVqvhATKjy/view?usp=share_link',
    synopsis: `“죽은 사람 무덤 앞에서 춤을 추면, 그 사람의 영혼을 부를 수 있다.” 
지애는 아버지의 무덤 앞에서 탭 댄스를 추려고 한다. 
도애는 그런 언니가 미쳤다고만 생각했다.`,
    awardsList: [
      '경기갭이어프로그램 지원작',
      '24년 11회 목포국도1호선독립영화제 도움닫기 작품상',
      '2024 김해시민영화제 초청상영',
      '제 1회 느림독립영화제 입상'
    ],
    stillPhotos: [
      'https://drive.google.com/file/d/1jnM76xd-NCiqlYCPqErZB4B8jWWSCZzx/view?usp=sharing',
      'https://drive.google.com/file/d/1FB3XoXveRqvLpokzY-5_gFrRZGm8AhbV/view?usp=sharing',
      'https://drive.google.com/file/d/1ksb4tPTiHQVVy3ip382kBbv7uWezp5Na/view?usp=sharing',
      'https://drive.google.com/file/d/1bl2rYa2s9x42_TTBwIZHz68mSMwqmKTH/view?usp=sharing',
      'https://drive.google.com/file/d/1j9af3a2zMHpp2CAaw2pLZv8EVkEPN2-2/view?usp=sharing',
      'https://drive.google.com/file/d/1NONP4-3rPPETu9zHN4Ctz8VqnFV2DKAe/view?usp=sharing',
      'https://drive.google.com/file/d/1lL988NrBTZ6wSwarfRijFwWIKLf-V32Q/view?usp=sharing',
      'https://drive.google.com/file/d/1Mc2UU9o0gbQ23dVuEgFfSSMk9HKwjF2_/view?usp=sharing'
    ]
  },
  {
    id: 'd6',
    category: ProjectCategory.DIRECTING,
    title: '그린비치',
    year: '2023',
    role: 'Director / Writer / Cinematographer',
    isFeature: true,
    genre: 'Mystery',
    runtime: '63min 47sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/1deNl-oHGpSjmVxd5CbFZovAMTsyAFLPm/view?usp=share_link',
    description: "백일안에 백만원으로 백분짜리 장편영화 찍기 프로젝트",
    synopsis: `해변에서 녹색 페인트를 뒤집어쓰고 실종된 의문의 여자 '서이서' 
세영은 해변에서 그녀가 버린 필름을 우연히 발견한다. 
그리고 그녀의 존재가 궁금해진 세영은 이서를 찾기 위해 필름 안에 들어 있던 사진들을 전시하기로 결심한다.
 세영은 사진전에 찾아온 이서의 전 애인 동우와 절친 해주를 인터뷰하며 이서가 어떤 사람이었을지를 묻는다. 
그런데 동우와 해주가 회상하는 이서는 마치 다른 person인 듯 매우 다르다.
 대체 서이서는 어떤 사람이었을까. 
세영이 혼란스러워 할 때쯤 진짜 서이서가 사진전에 찾아오는데...`,
    awardsList: [
      '프로젝트 백백백',
      '한국영상자료원 상영'
    ],
    stillPhotos: [
      'https://drive.google.com/file/d/1y99mPVzrkYVLQpxYWCZxtVDdgy0EqmxG/view?usp=sharing',
      'https://drive.google.com/file/d/1D58dsG2_n2a30GBY3ew5w5C9wZGQxS7X/view?usp=sharing',
      'https://drive.google.com/file/d/1rJKin0iRjrVxpTqQ68aL9yFnWyN6EjTA/view?usp=sharing',
      'https://drive.google.com/file/d/1scjH63hLB69k_CRX-tgOJmCjbUCad0Mq/view?usp=sharing',
      'https://drive.google.com/file/d/14p9_gR9s2SNQmh3KLsqSnO5jS7vFhbzE/view?usp=sharing',
      'https://drive.google.com/file/d/16eucW2usOfKSYg5byl7VztpuuGx1BTKL/view?usp=sharing',
      'https://drive.google.com/file/d/1EP41w7CnfkVir2x8odkOTX7R6Z1Jt2dL/view?usp=sharing',
      'https://drive.google.com/file/d/16d5XuOevwAf0G8p14NTJl0xGC0baeGPp/view?usp=sharing',
      'https://drive.google.com/file/d/1uw2ZVLyeXbGeDbR9yfADuhkYUeqbMBZn/view?usp=sharing',
      'https://drive.google.com/file/d/1jv05xlAN6gUnbFh3IHUNLL1OnMyot3gn/view?usp=sharing',
      'https://drive.google.com/file/d/1E2uvJ8kb2pUJy6VKZFDN84_IQ-dMpXJ_/view?usp=sharing'
    ]
  },
  {
    id: 'd5',
    category: ProjectCategory.DIRECTING,
    title: '겨울바람',
    titleEn: 'Winter Wind',
    year: '2023',
    role: 'Director / Writer',
    genre: 'Drama',
    runtime: '18min 16sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/1Q-lZqX-7G07EUEqAZPPMys_3MpJx2mRO/view?usp=share_link',
    synopsis: `1주년, 2주년, 3주년... 선제와 이수는 늘 한강에서 자전거를 타곤 했다. 
4주년인 오늘도 그들은 한강에 가기로 약속한다.  
하지만 거부할 수 없는 제안으로 둘의 4주년은 흔들리게 된다.`,
    stillPhotos: [
      'https://drive.google.com/file/d/1HYVuU4LA3erbfhMlUOh6psB_UEdvq2B-/view?usp=sharing',
      'https://drive.google.com/file/d/1X6Z4vfmJOdAp9PmGNF_PBwpb2fF2oCWc/view?usp=sharing',
      'https://drive.google.com/file/d/1cDTobV-wekZLG5qUIfkrqzqDJRHkfKFu/view?usp=sharing',
      'https://drive.google.com/file/d/1LiUH-Ho70FZizWcqRjomh4S3Pme7hKAc/view?usp=sharing',
      'https://drive.google.com/file/d/1tJZHYQKDIBpiX-nZ4QlW2hevm2K1iJvS/view?usp=sharing',
      'https://drive.google.com/file/d/1jKXHJMD1vS-2zoywmZzpiOUDYSkMneBI/view?usp=sharing'
    ]
  },
  {
    id: 'd9',
    category: ProjectCategory.DIRECTING,
    title: '학의로에서 안녕',
    year: '2022',
    role: 'Director / Writer',
    isAI: true,
    genre: 'SF',
    runtime: '5min',
    aspectRatio: '16:9',
    posterUrl: 'https://drive.google.com/file/d/1Qmrz_eNzzbmU2h92oWDdVV-2Vin8TCJd/view?usp=share_link',
    synopsis: "남자는 여자를 사랑했다. 그녀가 AI라는 사실을 알기 전까지는.",
    awardsList: [
      '2023 볼리 공모전 특별상 수상작'
    ],
    stillPhotos: [
      'https://drive.google.com/file/d/16Oyx0pRvC_zgGrf9BMAAzoJ5Kzjn68g9/view?usp=sharing',
      'https://drive.google.com/file/d/1-_1GxhGPhr8rhUkDR-O560GJcFyMKau2/view?usp=sharing',
      'https://drive.google.com/file/d/1aqTjXKxc7VwWq4dSxijaq1ReKYu1O-Z0/view?usp=sharing',
      'https://drive.google.com/file/d/1wttWdvt-rbNxUROzcXVhsd6VTGUkgSYf/view?usp=sharing'
    ]
  },
  {
    id: 'd8',
    category: ProjectCategory.DIRECTING,
    title: '주연배우계약서',
    year: '2022',
    role: 'Director',
    genre: 'Mystery, Thriller',
    runtime: '18min 6sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/12roadQ2TWm6BvlQXKOs02Pya5fOCG3mH/view?usp=share_link',
    synopsis: `유명한 영화배우가 되고 싶은 수현은 오디션을 보지만 잘 되지 않는다. 술집에서 오디션 봤던 영화의 작가를 발견한 수현은, 그녀의 마음을 사서 역할을 얻고자 한다. 하지만 결국 도착한 촬영장에는 끔찍한 일들만 그를 기다리고 있었다.`,
    stillPhotos: [
      'https://drive.google.com/file/d/1uT2w9o9gCljPKCEawNGTSQynBcT14zuu/view?usp=sharing',
      'https://drive.google.com/file/d/1sf12cOvTYWsr_tGpVvbdrsiygGd9KkGl/view?usp=sharing',
      'https://drive.google.com/file/d/1AH8uEpVHOoZWw5UvClHSbxIzMljAhZ49/view?usp=sharing',
      'https://drive.google.com/file/d/131IU17kVrM2fqjm2QWDT8Xjf3fINtkx5/view?usp=sharing',
      'https://drive.google.com/file/d/1zs4_w8RdgGx8Fhe6GGcLGd0TKncucpbN/view?usp=sharing',
      'https://drive.google.com/file/d/15CPb0N8cBBFRCqMCM50DsqaTXH0MNz2I/view?usp=sharing',
      'https://drive.google.com/file/d/1w7ny78dpkPIlu60sax7WxrS7fuAJKOPV/view?usp=sharing'
    ]
  },
  {
    id: 'd7',
    category: ProjectCategory.DIRECTING,
    title: 'EAST',
    year: '2022',
    role: 'Director / Writer',
    genre: 'Drama',
    runtime: '22min',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/1JbqKqgfxU4dc8DxjeVbrHaFT5lbKanlS/view?usp=share_link',
    synopsis: `“시 같은 이야기는 아무도 안 봐. 기.승.전.결이 있어야지.” 
운 좋게 초단편 소설을 기고할 기회를 얻은 현은 자신의 오랜 꿈이 담긴 시 수첩을 집어 던져버린다. 현의 소설이 시 같아서 재미없다는 편집장의 지속적인 피드백 때문이다. 

“누구나 가슴 속에 묵직한 돌을 품고 산데.” 
자신의 오랜 꿈, 사회복지사가 된 선우는 할머니 할아버지들에게 점점 차가워지는 자신을 발견하며 자꾸만 커져가는 응어리를 해소하지 못하고 우울증을 앓는다. 

한 때 자신의 꿈을 이야기하며 희망을 공유했던 현과 선우는 같은 집에 살지만 이제 더이상 대화하지 않는다. 서로에게 속삭였던 이상적인 미래와 현재의 괴리가 자꾸만 그들을 멀어지게 한다.`,
    stillPhotos: [
      'https://drive.google.com/file/d/1KkNVKK0230aIjbR6BTOd5cAV3gk5DASM/view?usp=sharing',
      'https://drive.google.com/file/d/11qSOHsjqsyrYuKxwmVOC6MjZbqHYbTdo/view?usp=sharing',
      'https://drive.google.com/file/d/15HJwrTnfMhi6b8s9fV9OKAKPf7zWJLL-/view?usp=sharing',
      'https://drive.google.com/file/d/1N0MWGL0IivBwT63CZv_uu41FkAZqD29G/view?usp=sharing',
      'https://drive.google.com/file/d/1f5vn-9QNFedqM5LK74BmJFhiDe97ighB/view?usp=sharing',
      'https://drive.google.com/file/d/1IUxImeECfSNfHDr5rDKVlFSEJpdrYnqj/view?usp=sharing',
      'https://drive.google.com/file/d/1_IMUTya6Zivf7B86LC_uZEMSxuk5K5Cf/view?usp=sharing',
      'https://drive.google.com/file/d/1EjteuDYGyOW_HAly4T8U2CGPmKm7ybw2/view?usp=sharing'
    ]
  },
  {
    id: 'd10',
    category: ProjectCategory.DIRECTING,
    title: '나는 프랑스로 갈 거야',
    year: '2019',
    role: 'Director / Writer',
    genre: 'Drama',
    runtime: '18min 20sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/1tH_5ABCaUUwYBHPfTv5CKmRhvBNmwCLz/view?usp=share_link',
    synopsis: `글을 쓰고 싶고, 프랑스로 떠나고 싶다는 막연한 꿈을 품은 연수와 수연은  
매일 같은 방, 같은 침대에서 꿈만 꾸며 하루를 보낸다. 
무엇이 두려운지도 모른 채 사랑의 뒤에 숨어, 각자의 꿈을 미뤄온 두 사람. 
떠나는 선택과 남는 선택이 갈라지는 순간, 멈춰 있던 시간은 비로소 움직이기 시작한다.`,
    stillPhotos: [
      'https://drive.google.com/file/d/1JVVJj5ApVXo9WunWRitn0toYQ-30luTk/view?usp=share_link',
      'https://drive.google.com/file/d/1hqiNkit1nJOdEnxoMe3KO6PqMa1avL6n/view?usp=share_link',
      'https://drive.google.com/file/d/1uXgLDgeFZ5DPaTuf271rsSxVLVU1lA9L/view?usp=share_link',
      'https://drive.google.com/file/d/1hBB8_WaMhOm4NB4um1QCbKVisFTlkIEy/view?usp=share_link',
      'https://drive.google.com/file/d/134euyFwfvYNuJIbnLmRZGT46iaK5kRql/view?usp=sharing',
      'https://drive.google.com/file/d/1ZGHuKi3vceonaekDu50iBsqApuXTpKnH/view?usp=sharing',
      'https://drive.google.com/file/d/1aQOviLrouy69Hgj6h_hbfTPfzkcrCl9v/view?usp=sharing'
    ]
  },

  // --- AI FILM ---
  {
    id: 'ai1',
    category: ProjectCategory.AI_FILM,
    title: '마지막 명령',
    titleEn: 'The Last Command',
    year: '2025',
    role: 'Director / Writer',
    isAI: true,
    genre: 'SF',
    runtime: '4min 32sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/18HQGrUhARjK7UTVnQyRi2GKvLzFY3KhX/view?usp=share_link',
    synopsis: "AI가 탑재된 전투기 조종사 노아 브릭스는 기체 이상으로 도심 추락 위기에 처한다.",
    awardsList: [
      '제 5회 금천패션영화제 경쟁작',
      '제 3회 죽서 AI 영화제 장려상 수상'
    ]
  },
  {
    id: 'ai2',
    category: ProjectCategory.AI_FILM,
    title: '친절한 바바야가',
    titleEn: 'The Kind Baba Yaga',
    year: '2024',
    role: 'Director / Writer',
    isAI: true,
    genre: 'Horror, Drama',
    runtime: '4min 32sec',
    aspectRatio: '16:9',
    posterUrl: 'https://drive.google.com/file/d/1cygxLKvfrOUSeQZmUO57aHYhwBJBx5Uu/view?usp=share_link',
    synopsis: "처음 할머니를 만나러 간 소년은 엄마에게 들은 마귀할멈 ‘바바야가’ 이야기 때문에 무서운 악몽을 꾼다.",
    stillPhotos: [
      'https://drive.google.com/file/d/1YXPDcB4iVGsuiRtcLyx2EUhtHrQT53jr/view?usp=sharing',
      'https://drive.google.com/file/d/1BdeT6IU23zz9Hfv7oKtEZa_aK4rwarIn/view?usp=sharing',
      'https://drive.google.com/file/d/1KoHFdyfKajUVfXB9bvmCPdgrZPsQSFjw/view?usp=sharing',
      'https://drive.google.com/file/d/1k6mWWO4Q-eFHD3_N7LHX5f4TjFIZc_oZ/view?usp=sharing',
      'https://drive.google.com/file/d/1cWt6fT3UyYRu3He8HBmc7qft4VWd-Lya/view?usp=sharing',
      'https://drive.google.com/file/d/1LIbWANoQjXEWQKiNA1LtgJ1kF76atpVN/view?usp=sharing',
      'https://drive.google.com/file/d/1NYXg0ZHG4tWPQrXxyoqI8-CPHqsCt5V-/view?usp=sharing',
      'https://drive.google.com/file/d/1txGOnscqEEw__b3uZ02e758I2e_dsjB3/view?usp=sharing',
      'https://drive.google.com/file/d/1078NKv-vlstSvPy2pa3d-fD5yWN5VhRT/view?usp=sharing',
      'https://drive.google.com/file/d/1Cx8JDEyBs-997fPKwmmtSG6YSWXQqswV/view?usp=sharing',
      'https://drive.google.com/file/d/1xTIddT-udyF2XHSXZl71bbCq5sWMRW25/view?usp=sharing',
      'https://drive.google.com/file/d/1JUxa7DopJjm0pA2f-6q8emjAZqnamJT2/view?usp=sharing',
      'https://drive.google.com/file/d/1CEduH-qWxZi86N-2JgTAVe-eYSphC23j/view?usp=sharing',
      'https://drive.google.com/file/d/1JA6SqjQJPWoBBEXTc5_0p-T6aIj54lRo/view?usp=sharing',
      'https://drive.google.com/file/d/1qUOs26LH6m_SCcFNftm-I9j3oESoYnGc/view?usp=sharing'
    ]
  },
  {
    id: 'ai3',
    category: ProjectCategory.AI_FILM,
    title: '학의로에서 안녕',
    year: '2022',
    role: 'Director / Writer',
    isAI: true,
    genre: 'SF',
    runtime: '5min',
    aspectRatio: '16:9',
    posterUrl: 'https://drive.google.com/file/d/1Qmrz_eNzzbmU2h92oWDdVV-2Vin8TCJd/view?usp=share_link',
    synopsis: "남자는 여자를 사랑했다. 그녀가 AI라는 사실을 알기 전까지는.",
    awardsList: [
      '2023 볼리 공모전 특별상 수상작'
    ],
    stillPhotos: [
      'https://drive.google.com/file/d/16Oyx0pRvC_zgGrf9BMAAzoJ5Kzjn68g9/view?usp=sharing',
      'https://drive.google.com/file/d/1-_1GxhGPhr8rhUkDR-O560GJcFyMKau2/view?usp=sharing',
      'https://drive.google.com/file/d/1aqTjXKxc7VwWq4dSxijaq1ReKYu1O-Z0/view?usp=sharing',
      'https://drive.google.com/file/d/1wttWdvt-rbNxUROzcXVhsd6VTGUkgSYf/view?usp=sharing'
    ]
  },

  // --- CINEMATOGRAPHY ---
  {
    id: 'c0',
    category: ProjectCategory.CINEMATOGRAPHY,
    title: '그린비치',
    year: '2023',
    role: 'Director / Writer / Cinematographer',
    isFeature: true,
    genre: 'Mystery',
    runtime: '63min 47sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/1deNl-oHGpSjmVxd5CbFZovAMTsyAFLPm/view?usp=share_link',
    description: "백일안에 백만원으로 백분짜리 장편영화 찍기 프로젝트",
    synopsis: `해변에서 녹색 페인트를 뒤집어쓰고 실종된 의문의 여자 '서이서' 
세영은 해변에서 그녀가 버린 필름을 우연히 발견한다. 
그리고 그녀의 존재가 궁금해진 세영은 이서를 찾기 위해 필름 안에 들어 있던 사진들을 전시하기로 결심한다.
 세영은 사진전에 찾아온 이서의 전 애인 동우와 절친 해주를 인터뷰하며 이서가 어떤 사람이었을지를 묻는다. 
그런데 동우와 해주가 회상하는 이서는 마치 다른 person인 듯 매우 다르다.
 대체 서이서는 어떤 사람이었을까. 
세영이 혼란스러워 할 때쯤 진짜 서이서가 사진전에 찾아오는데...`,
    awardsList: [
      '프로젝트 백백백',
      '한국영상자료원 상영'
    ],
    stillPhotos: [
      'https://drive.google.com/file/d/1y99mPVzrkYVLQpxYWCZxtVDdgy0EqmxG/view?usp=sharing',
      'https://drive.google.com/file/d/1D58dsG2_n2a30GBY3ew5w5C9wZGQxS7X/view?usp=sharing',
      'https://drive.google.com/file/d/1rJKin0iRjrVxpTqQ68aL9yFnWyN6EjTA/view?usp=sharing',
      'https://drive.google.com/file/d/1scjH63hLB69k_CRX-tgOJmCjbUCad0Mq/view?usp=sharing',
      'https://drive.google.com/file/d/14p9_gR9s2SNQmh3KLsqSnO5jS7vFhbzE/view?usp=sharing',
      'https://drive.google.com/file/d/16eucW2usOfKSYg5byl7VztpuuGx1BTKL/view?usp=sharing',
      'https://drive.google.com/file/d/1EP41w7CnfkVir2x8odkOTX7R6Z1Jt2dL/view?usp=sharing',
      'https://drive.google.com/file/d/16d5XuOevwAf0G8p14NTJl0xGC0baeGPp/view?usp=sharing',
      'https://drive.google.com/file/d/1uw2ZVLyeXbGeDbR9yfADuhkYUeqbMBZn/view?usp=sharing',
      'https://drive.google.com/file/d/1jv05xlAN6gUnbFh3IHUNLL1OnMyot3gn/view?usp=sharing',
      'https://drive.google.com/file/d/1E2uvJ8kb2pUJy6VKZFDN84_IQ-dMpXJ_/view?usp=sharing'
    ]
  },
  {
    id: 'c1',
    category: ProjectCategory.CINEMATOGRAPHY,
    title: '사라짐을 기억하는 사라지는 ㅁ',
    year: '2023',
    role: 'Cinematographer / Editor / DI',
    genre: 'Dance',
    runtime: '7min 26sec',
    aspectRatio: '4:3',
    posterUrl: 'https://drive.google.com/file/d/1yLEA0j6ZZ_Yxz_8GsZe6rKsL9PcItj7-/view?usp=share_link',
    synopsis: '사라짐을 기억하는 사라지는 ㅁ'
  },
  {
    id: 'c2',
    category: ProjectCategory.CINEMATOGRAPHY,
    title: '복채',
    titleEn: 'Karma',
    year: '2022',
    role: 'Cinematographer',
    genre: 'Mystery, Thriller',
    runtime: '14min 27sec',
    posterUrl: 'https://drive.google.com/file/d/1GgH61ISIMKwoy3bGsVWxOLQyEwd0DFb-/view?usp=share_link',
    synopsis: '사람의 운명을 파괴하는 살인자, 사람의 운명을 예측하는 역술가. 정체를 숨긴 두 사람이 철학관에서 만난다. 경찰의 신분으로 위장한 살인자, 살인 사건을 목격한 역술가, 두 사람의 극적인 조우에서 살아남을 사람은 누구인가.',
    awardsList: [
      '제 28회 부천국제판타스틱영화제 단편경쟁',
      '제 23회 피렌체한국영화제 Shorts부문 상영작'
    ]
  },
  {
    id: 'c3',
    category: ProjectCategory.CINEMATOGRAPHY,
    title: '노이즈캔슬링',
    titleEn: 'Noise Cancelling',
    year: '2022',
    role: 'Cinematographer / Editor / DI',
    genre: 'Drama',
    runtime: '10min 36sec',
    posterUrl: 'https://drive.google.com/file/d/1rohO2hM-ei7WONN9R8-IlJsQWNW67BuX/view?usp=share_link',
    synopsis: '바깥의 소리로부터 멀어지고 싶었던 지온이 해수를 만나게 되면서, 진정으로 필요한 소리에 대해 깨닫게 되는 이야기',
    awardsList: [
      '2025 완주 아동권리영화제 우수상 수상'
    ]
  },
  {
    id: 'c4',
    category: ProjectCategory.CINEMATOGRAPHY,
    title: 'MAN IN DRESS',
    year: '2022',
    role: 'Cinematographer / Editor / DI',
    genre: 'Fashion',
    runtime: '3min 46sec',
    aspectRatio: '2.35:1',
    posterUrl: 'https://drive.google.com/file/d/1kDLa4Rcl67_PZpmwZFKBtpcNQR9r8aPt/view?usp=share_link',
    synopsis: 'MAN IN DRESS'
  },

  // --- COMMERCIAL ---
  {
    id: 'exp1',
    category: ProjectCategory.COMMERCIAL,
    title: '잇더컴퍼니, 맘마레시피',
    year: '2023-2025',
    role: 'Content Producer',
    link: 'https://www.youtube.com/@남궁건-광고-포폴/shorts',
    posterUrl: 'https://drive.google.com/file/d/1Ohj8qOpxMwhCX9vWOa9UWSA9XiH7JH39/view?usp=share_link',
    awardsList: [
      '2023. 09 ~ 2025. 07',
      '광고, 인스타 기획, 촬영, 편집'
    ]
  },

  // --- PRODUCING ---
  {
    id: 'p1',
    category: ProjectCategory.PRODUCING,
    title: '방문',
    year: '2025',
    role: 'Assistant Director',
    awardsList: ['CJENM&영상원 30주년 기념', '2025 부산국제영화제 Community Biff']
  },
  {
    id: 'p2',
    category: ProjectCategory.PRODUCING,
    title: '내남자의 브래지어',
    year: '2024',
    role: 'Assistant Director',
    awardsList: ['2024 부산국제영화제 Community Biff']
  },
  {
    id: 'p5',
    category: ProjectCategory.PRODUCING,
    title: '인공세상의 새로운 아침',
    year: '2023',
    role: 'Producer',
    genre: 'SF, Drama',
    awardsList: ['제 28회 부산국제영화제 단편경쟁']
  },
  {
    id: 'p3',
    category: ProjectCategory.PRODUCING,
    title: '죽고 싶다 죽이고 싶다',
    year: '2023',
    role: 'Producer',
    awardsList: ['2024 판타지아국제영화제']
  },
  {
    id: 'p4',
    category: ProjectCategory.PRODUCING,
    title: '그녀의 문제와 불꽃',
    year: '2019',
    role: 'Assistant Director',
    genre: 'Drama',
    awardsList: ['제 45회 서울독립영화제 단편경쟁']
  }
];