import type { PersonalityType } from '../types/test'

// 16种MBTI人格类型描述
export const personalityTypes: Record<string, PersonalityType> = {
  "INTJ": {
    code: "INTJ",
    name: "建筑师",
    nickname: "策略家",
    description: "INTJ型人格独立思考，富有创新精神。他们善于制定战略和长期规划，追求知识和能力。他们逻辑清晰，有远见卓识，追求卓越。",
    strengths: [
      "战略思维强",
      "独立思考",
      "分析能力强",
      "创新能力强",
      "决断力强"
    ],
    weaknesses: [
      "可能过于批判",
      "可能过于独立",
      "可能忽视他人感受",
      "可能过于完美主义",
      "可能缺乏耐心"
    ],
    careerPaths: [
      "科学家",
      "工程师",
      "战略顾问",
      "投资银行家",
      "系统分析师"
    ]
  },
  "ESTP": {
    code: "ESTP",
    name: "企业家",
    nickname: "冒险家",
    description: "ESTP型人格充满活力和冒险精神，他们是行动派，喜欢直接解决问题。他们灵活机智，善于在压力下工作，享受刺激和挑战。他们实用且富有魅力。",
    strengths: [
      "解决问题能力强",
      "适应力强",
      "实践能力强",
      "灵活机智",
      "善于危机处理"
    ],
    weaknesses: [
      "可能冲动",
      "不喜欢承诺",
      "可能忽视长期计划",
      "可能过于冒险",
      "不耐烦"
    ],
    careerPaths: [
      "企业家",
      "销售代表",
      "运动员",
      "警察",
      "紧急救援人员"
    ]
  },
  "ESTJ": {
    code: "ESTJ",
    name: "管理者",
    nickname: "执行者",
    description: "ESTJ型人格实际、注重细节且有组织能力，他们喜欢建立秩序和结构。他们重视传统和规则，善于管理和组织人员与资源，高效且可靠。",
    strengths: [
      "组织能力强",
      "实际可靠",
      "决断力强",
      "忠诚负责",
      "注重细节"
    ],
    weaknesses: [
      "可能过于固执",
      "不够灵活",
      "可能忽视他人感受",
      "不善于处理情感问题",
      "可能过于专制"
    ],
    careerPaths: [
      "项目经理",
      "行政主管",
      "军事领导",
      "财务分析师",
      "法官"
    ]
  },
  "ESFJ": {
    code: "ESFJ",
    name: "执行官",
    nickname: "照顾者",
    description: "ESFJ型人格热情友好，注重和谐与合作。他们关心他人福祉，善于照顾他人需求。他们重视传统和社会规范，乐于服务社区和组织。",
    strengths: [
      "人际关系能力强",
      "忠诚可靠",
      "善于合作",
      "组织能力强",
      "富有同情心"
    ],
    weaknesses: [
      "可能过度敏感",
      "需要认可",
      "可能回避冲突",
      "难以适应变化",
      "可能过度担忧"
    ],
    careerPaths: [
      "护士",
      "教师",
      "人力资源专员",
      "社会工作者",
      "客户服务代表"
    ]
  },
  "ISTJ": {
    code: "ISTJ",
    name: "物流师",
    nickname: "检查者",
    description: "ISTJ型人格实际可靠，注重细节和秩序。他们重视传统和责任，善于组织和管理资源。他们逻辑清晰，做事彻底，值得信赖。",
    strengths: [
      "组织能力强",
      "可靠负责",
      "注重细节",
      "逻辑思维强",
      "实践能力强"
    ],
    weaknesses: [
      "可能过于固执",
      "可能不够灵活",
      "可能忽视情感因素",
      "可能过于传统",
      "可能过于批判"
    ],
    careerPaths: [
      "会计师",
      "审计师",
      "军事人员",
      "法官",
      "项目经理"
    ]
  },
  "ISFJ": {
    code: "ISFJ",
    name: "守卫者",
    nickname: "保护者",
    description: "ISFJ型人格温和可靠，注重细节和责任。他们关心他人福祉，善于照顾他人需求。他们忠诚负责，重视传统和稳定。",
    strengths: [
      "可靠负责",
      "注重细节",
      "富有同情心",
      "忠诚奉献",
      "实践能力强"
    ],
    weaknesses: [
      "可能过度牺牲自我",
      "可能过度担忧",
      "难以适应变化",
      "可能回避冲突",
      "可能过度敏感"
    ],
    careerPaths: [
      "护士",
      "行政助理",
      "小学教师",
      "社会工作者",
      "客户服务代表"
    ]
  },
  "ENTP": {
    code: "ENTP",
    name: "辩论家",
    nickname: "发明家",
    description: "ENTP型人格聪明机智，充满创新精神。他们喜欢挑战传统观念，善于发现新的可能性。他们思维敏捷，善于辩论，享受智力挑战。",
    strengths: [
      "创新能力强",
      "适应力强",
      "分析能力强",
      "解决问题能力强",
      "善于辩论"
    ],
    weaknesses: [
      "可能不够专注",
      "可能忽视细节",
      "可能过于争论",
      "不善于执行",
      "可能不够耐心"
    ],
    careerPaths: [
      "企业家",
      "律师",
      "咨询顾问",
      "市场营销专家",
      "软件开发者"
    ]
  },
  "ENFP": {
    code: "ENFP",
    name: "活动家",
    nickname: "探险家",
    description: "ENFP型人格热情洋溢，富有创造力。他们善于发现可能性和潜力，喜欢尝试新事物。他们重视自由和真实性，善于激励他人。",
    strengths: [
      "创造力强",
      "适应力强",
      "沟通能力强",
      "富有同情心",
      "善于激励他人"
    ],
    weaknesses: [
      "可能不够专注",
      "可能过度理想化",
      "难以做决定",
      "不善于处理细节",
      "可能情绪波动"
    ],
    careerPaths: [
      "心理咨询师",
      "记者",
      "艺术家",
      "市场营销专家",
      "人力资源专员"
    ]
  },
  "ENTJ": {
    code: "ENTJ",
    name: "指挥官",
    nickname: "领导者",
    description: "ENTJ型人格果断自信，天生的领导者。他们善于制定战略和长期规划，追求效率和成功。他们直接坦率，善于组织和领导团队。",
    strengths: [
      "领导能力强",
      "战略思维强",
      "决断力强",
      "自信果断",
      "组织能力强"
    ],
    weaknesses: [
      "可能过于专制",
      "可能不够耐心",
      "可能忽视他人感受",
      "可能过于苛刻",
      "可能工作过度"
    ],
    careerPaths: [
      "企业高管",
      "管理咨询顾问",
      "律师",
      "政治家",
      "项目经理"
    ]
  },
  "ENFJ": {
    code: "ENFJ",
    name: "主人公",
    nickname: "教导者",
    description: "ENFJ型人格热情友好，富有同情心。他们善于理解和激励他人，重视和谐与合作。他们有强烈的道德感和责任感，致力于帮助他人成长。",
    strengths: [
      "沟通能力强",
      "领导能力强",
      "富有同情心",
      "善于激励他人",
      "组织能力强"
    ],
    weaknesses: [
      "可能过度理想化",
      "可能过度牺牲自我",
      "可能过度敏感",
      "难以接受批评",
      "可能过度担忧"
    ],
    careerPaths: [
      "教师",
      "心理咨询师",
      "人力资源专员",
      "非营利组织领导",
      "销售经理"
    ]
  },
  "ISTP": {
    code: "ISTP",
    name: "鉴赏家",
    nickname: "技匠",
    description: "ISTP型人格冷静沉着，善于观察和分析。他们喜欢解决实际问题，擅长使用工具和技术。他们独立自主，喜欢冒险和挑战。",
    strengths: [
      "实践能力强",
      "适应力强",
      "解决问题能力强",
      "冷静沉着",
      "观察力强"
    ],
    weaknesses: [
      "可能缺乏长期规划",
      "可能不善于表达情感",
      "可能过于独立",
      "可能冲动",
      "可能回避承诺"
    ],
    careerPaths: [
      "工程师",
      "机械师",
      "飞行员",
      "计算机程序员",
      "法医科学家"
    ]
  },
  "ISFP": {
    code: "ISFP",
    name: "艺术家",
    nickname: "探索者",
    description: "ISFP型人格温和友善，富有艺术气质。他们重视个人价值观和真实性，喜欢自由和美感。他们善于欣赏当下的美好，富有同情心。",
    strengths: [
      "创造力强",
      "适应力强",
      "富有同情心",
      "实践能力强",
      "善于观察"
    ],
    weaknesses: [
      "可能过度保留",
      "可能回避冲突",
      "可能缺乏长期规划",
      "可能过度敏感",
      "可能难以做决定"
    ],
    careerPaths: [
      "艺术家",
      "设计师",
      "音乐家",
      "护士",
      "厨师"
    ]
  },
  "ESFP": {
    code: "ESFP",
    name: "表演者",
    nickname: "娱乐者",
    description: "ESFP型人格热情开朗，他们是天生的表演者和娱乐者。他们喜欢成为关注的焦点，享受当下的生活。他们友善、乐观，善于让他人感到快乐。",
    strengths: [
      "社交能力强",
      "实践能力强",
      "适应力强",
      "乐观开朗",
      "富有同情心"
    ],
    weaknesses: [
      "可能过度冲动",
      "难以长期规划",
      "容易分心",
      "可能过度依赖他人",
      "不善于理论思考"
    ],
    careerPaths: [
      "演员",
      "销售代表",
      "活动策划师",
      "幼儿教师",
      "美容师"
    ]
  },
  "INTP": {
    code: "INTP",
    name: "逻辑学家",
    nickname: "思想家",
    description: "INTP型人格善于逻辑分析，追求知识和理解。他们喜欢探索理论和概念，善于发现模式和解决复杂问题。他们独立思考，重视智力自主。",
    strengths: [
      "分析能力强",
      "创新能力强",
      "逻辑思维强",
      "适应力强",
      "独立思考"
    ],
    weaknesses: [
      "可能过于理论化",
      "可能忽视实际细节",
      "可能不善于表达情感",
      "可能过于怀疑",
      "可能缺乏执行力"
    ],
    careerPaths: [
      "计算机程序员",
      "科学家",
      "系统分析师",
      "大学教授",
      "经济学家"
    ]
  },
  "INFJ": {
    code: "INFJ",
    name: "提倡者",
    nickname: "理想主义者",
    description: "INFJ型人格富有洞察力和同情心。他们有强烈的道德感和理想主义，致力于帮助他人和改善世界。他们深思熟虑，重视真实性和意义。",
    strengths: [
      "洞察力强",
      "富有同情心",
      "创造力强",
      "决断力强",
      "有远见"
    ],
    weaknesses: [
      "可能过度理想化",
      "可能过度完美主义",
      "可能过度敏感",
      "可能过度牺牲自我",
      "可能难以接受批评"
    ],
    careerPaths: [
      "心理咨询师",
      "作家",
      "教师",
      "社会工作者",
      "人力资源专员"
    ]
  },
  "INFP": {
    code: "INFP",
    name: "调停者",
    nickname: "治愈者",
    description: "INFP型人格富有理想主义和同情心。他们重视个人价值观和真实性，追求意义和目的。他们富有创造力，善于理解他人的情感需求。",
    strengths: [
      "创造力强",
      "富有同情心",
      "适应力强",
      "忠于价值观",
      "善于理解他人"
    ],
    weaknesses: [
      "可能过度理想化",
      "可能过度敏感",
      "可能回避冲突",
      "可能难以做决定",
      "可能不够实际"
    ],
    careerPaths: [
      "作家",
      "心理咨询师",
      "艺术家",
      "教师",
      "社会工作者"
    ]
  }
}