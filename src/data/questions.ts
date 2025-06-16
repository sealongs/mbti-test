import type { Question } from '../types/test'

// MBTI测试问题集
// 标准的MBTI测试包含93个问题
export const questions: Question[] = [
  // E/I 维度问题 (外向/内向) - 23个问题
  {
    id: 1,
    text: "我喜欢成为关注的焦点。",
    dimension: "EI",
    direction: "positive" // 高分表示更外向(E)
  },
  {
    id: 2,
    text: "我喜欢独自工作而不是与他人合作。",
    dimension: "EI",
    direction: "negative" // 高分表示更内向(I)
  },
  {
    id: 3,
    text: "我倾向于先思考后行动。",
    dimension: "EI",
    direction: "negative" // 高分表示更内向(I)
  },
  {
    id: 4,
    text: "我在社交场合中感到精力充沛。",
    dimension: "EI",
    direction: "positive" // 高分表示更外向(E)
  },
  {
    id: 5,
    text: "我更喜欢与少数几个人进行深入交流，而不是与很多人进行简短交流。",
    dimension: "EI",
    direction: "negative" // 高分表示更内向(I)
  },
  {
    id: 6,
    text: "参加聚会和社交活动能让我感到活力焕发。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 7,
    text: "我需要独处的时间来恢复精力。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 8,
    text: "我倾向于主动开始与陌生人的对话。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 9,
    text: "长时间的社交活动后我感到精疲力竭。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 10,
    text: "我喜欢在团队中工作。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 11,
    text: "我更喜欢安静的环境而不是嘈杂的环境。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 12,
    text: "我经常在群体中主动发言。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 13,
    text: "我更喜欢通过写作而不是口头表达我的想法。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 14,
    text: "我喜欢认识新朋友并扩展我的社交圈。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 15,
    text: "我更喜欢深度阅读而不是参加社交活动。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 16,
    text: "我在陌生环境中很快就能适应并感到自在。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 17,
    text: "我喜欢有自己的私人空间和时间。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 18,
    text: "我喜欢成为谈话的发起者。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 19,
    text: "我更喜欢一对一的交流而不是群体讨论。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 20,
    text: "我在社交媒体上很活跃并经常分享我的生活。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 21,
    text: "我更喜欢观察而不是参与。",
    dimension: "EI",
    direction: "negative"
  },
  {
    id: 22,
    text: "我喜欢组织和参加社交活动。",
    dimension: "EI",
    direction: "positive"
  },
  {
    id: 23,
    text: "我需要时间独自思考和反思。",
    dimension: "EI",
    direction: "negative"
  },

  // S/N 维度问题 (感觉/直觉) - 23个问题
  {
    id: 24,
    text: "我更关注细节而不是整体概念。",
    dimension: "SN",
    direction: "positive" // 高分表示更感觉型(S)
  },
  {
    id: 25,
    text: "我喜欢思考未来的可能性而不是当前的现实。",
    dimension: "SN",
    direction: "negative" // 高分表示更直觉型(N)
  },
  {
    id: 26,
    text: "我更相信经验而不是理论。",
    dimension: "SN",
    direction: "positive" // 高分表示更感觉型(S)
  },
  {
    id: 27,
    text: "我经常思考事物之间的联系和模式。",
    dimension: "SN",
    direction: "negative" // 高分表示更直觉型(N)
  },
  {
    id: 28,
    text: "我更喜欢实际和具体的工作，而不是概念性和抽象的工作。",
    dimension: "SN",
    direction: "positive" // 高分表示更感觉型(S)
  },
  {
    id: 29,
    text: "我喜欢探索新的想法和概念。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 30,
    text: "我更关注事实和数据而不是理论和假设。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 31,
    text: "我经常思考事物的深层含义。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 32,
    text: "我更喜欢按照既定的方法做事。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 33,
    text: "我喜欢思考抽象的概念和理论。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 34,
    text: "我更相信我能看到和触摸到的东西。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 35,
    text: "我喜欢寻找新的解决问题的方法。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 36,
    text: "我更关注当下而不是未来。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 37,
    text: "我喜欢思考事物的可能性和潜力。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 38,
    text: "我更喜欢具体的指导而不是开放式的问题。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 39,
    text: "我经常有创新的想法。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 40,
    text: "我更喜欢实践经验而不是理论知识。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 41,
    text: "我喜欢思考事物的多种可能性。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 42,
    text: "我更喜欢按部就班地解决问题。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 43,
    text: "我喜欢探索未知的领域和新的可能性。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 44,
    text: "我更相信我亲眼所见的事物。",
    dimension: "SN",
    direction: "positive"
  },
  {
    id: 45,
    text: "我喜欢思考事物背后的意义和联系。",
    dimension: "SN",
    direction: "negative"
  },
  {
    id: 46,
    text: "我更喜欢实际的应用而不是理论的探讨。",
    dimension: "SN",
    direction: "positive"
  },

  // T/F 维度问题 (思考/情感) - 23个问题
  {
    id: 47,
    text: "我在做决定时更看重逻辑而不是个人感受。",
    dimension: "TF",
    direction: "positive" // 高分表示更思考型(T)
  },
  {
    id: 48,
    text: "我经常考虑我的决定如何影响他人的感受。",
    dimension: "TF",
    direction: "negative" // 高分表示更情感型(F)
  },
  {
    id: 49,
    text: "我认为保持客观比维护和谐更重要。",
    dimension: "TF",
    direction: "positive" // 高分表示更思考型(T)
  },
  {
    id: 50,
    text: "我倾向于相信我的直觉和感受。",
    dimension: "TF",
    direction: "negative" // 高分表示更情感型(F)
  },
  {
    id: 51,
    text: "我更喜欢分析问题而不是关注人际关系。",
    dimension: "TF",
    direction: "positive" // 高分表示更思考型(T)
  },
  {
    id: 52,
    text: "我在做决定时会考虑他人的情感需求。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 53,
    text: "我更看重公平和正义而不是同情和怜悯。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 54,
    text: "我经常根据我的价值观和信念做决定。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 55,
    text: "我更喜欢给予建设性的批评而不是安慰。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 56,
    text: "我倾向于避免冲突以维护和谐。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 57,
    text: "我更看重效率而不是人际关系。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 58,
    text: "我经常为他人的情感需求让步。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 59,
    text: "我更喜欢基于事实和数据做决定。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 60,
    text: "我经常考虑我的决定如何影响团队和谐。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 61,
    text: "我更看重真相而不是他人的感受。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 62,
    text: "我倾向于先考虑人的因素再做决定。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 63,
    text: "我更喜欢直接指出问题而不是委婉表达。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 64,
    text: "我经常为了维护关系而妥协。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 65,
    text: "我更看重逻辑一致性而不是个人价值观。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 66,
    text: "我倾向于相信他人的善意。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 67,
    text: "我更喜欢客观分析而不是主观感受。",
    dimension: "TF",
    direction: "positive"
  },
  {
    id: 68,
    text: "我经常为他人的情感状态担忧。",
    dimension: "TF",
    direction: "negative"
  },
  {
    id: 69,
    text: "我更看重公正而不是仁慈。",
    dimension: "TF",
    direction: "positive"
  },

  // J/P 维度问题 (判断/感知) - 24个问题
  {
    id: 70,
    text: "我喜欢提前计划而不是即兴行事。",
    dimension: "JP",
    direction: "positive" // 高分表示更判断型(J)
  },
  {
    id: 71,
    text: "我喜欢保持选择的开放性，而不是提前做决定。",
    dimension: "JP",
    direction: "negative" // 高分表示更感知型(P)
  },
  {
    id: 72,
    text: "我喜欢有条理和结构化的环境。",
    dimension: "JP",
    direction: "positive" // 高分表示更判断型(J)
  },
  {
    id: 73,
    text: "我更喜欢灵活应对而不是严格遵循计划。",
    dimension: "JP",
    direction: "negative" // 高分表示更感知型(P)
  },
  {
    id: 74,
    text: "我喜欢在截止日期前很久就完成任务。",
    dimension: "JP",
    direction: "positive" // 高分表示更判断型(J)
  },
  {
    id: 75,
    text: "我喜欢保持我的选择开放，不急于做决定。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 76,
    text: "我喜欢按照计划和时间表行事。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 77,
    text: "我更喜欢自发行动而不是严格遵循计划。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 78,
    text: "我喜欢提前做决定并坚持执行。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 79,
    text: "我喜欢保持灵活性以应对变化。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 80,
    text: "我更喜欢有序和可预测的环境。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 81,
    text: "我喜欢探索多种可能性而不是快速做决定。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 82,
    text: "我喜欢按照清单和计划完成任务。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 83,
    text: "我更喜欢随机应变而不是严格按计划行事。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 84,
    text: "我喜欢有明确的目标和截止日期。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 85,
    text: "我更喜欢保持开放的态度，等待更多信息再做决定。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 86,
    text: "我喜欢提前做好准备。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 87,
    text: "我更喜欢即兴发挥而不是详细规划。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 88,
    text: "我喜欢有明确的规则和指导方针。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 89,
    text: "我更喜欢灵活的工作环境而不是严格的规章制度。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 90,
    text: "我喜欢按部就班地完成任务。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 91,
    text: "我更喜欢在最后期限前临时完成任务。",
    dimension: "JP",
    direction: "negative"
  },
  {
    id: 92,
    text: "我喜欢有明确的日程安排。",
    dimension: "JP",
    direction: "positive"
  },
  {
    id: 93,
    text: "我更喜欢自由发挥而不是遵循严格的规则。",
    dimension: "JP",
    direction: "negative"
  }
]