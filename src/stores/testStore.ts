import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Question, Answer, Result } from '../types/test'
import { questions } from '../data/questions'
import { handleError } from '../utils/errorHandler'

export const useTestStore = defineStore('test', () => {
  // 测试状态
  const isInitialized = ref(false)
  const testQuestions = ref<Question[]>([])
  // 状态
  const currentQuestionIndex = ref(0)
  const answers = ref<Answer[]>([])
  const result = ref<Result | null>(null)
  const isTestCompleted = ref(false)

  // 计算属性
  const currentQuestion = computed(() => testQuestions.value[currentQuestionIndex.value])
  const progress = computed(() => {
    if (testQuestions.value.length === 0) return 0
    return Math.round(((currentQuestionIndex.value + 1) / testQuestions.value.length) * 100)
  })
  const canGoNext = computed(() => currentQuestionIndex.value < testQuestions.value.length - 1)
  const canGoPrevious = computed(() => currentQuestionIndex.value > 0)
  
  // 获取当前问题的答案
  const getCurrentAnswer = computed(() => {
    const answer = answers.value.find(a => a.questionId === currentQuestion.value?.id)
    return answer ? answer.value : 0
  })

  // 方法
  async function initializeTest() {
    try {
      // 验证问题数据
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Invalid questions data')
      }

      // 初始化测试问题
      testQuestions.value = [...questions]
      isInitialized.value = true
      resetTest()
    } catch (error) {
      isInitialized.value = false
      testQuestions.value = []
      throw error
    }
  }

  function setAnswer(value: number) {
    if (!isInitialized.value) {
      handleError(new Error('Test not initialized'), {
        context: 'Set Answer',
        showMessage: true,
        message: '测试未初始化，请刷新页面重试'
      })
      return
    }
    const questionId = currentQuestion.value.id
    const existingAnswerIndex = answers.value.findIndex(a => a.questionId === questionId)
    
    if (existingAnswerIndex !== -1) {
      // 更新现有答案
      answers.value[existingAnswerIndex].value = value
    } else {
      // 添加新答案
      answers.value.push({ questionId, value })
    }
  }

  function nextQuestion() {
    if (!isInitialized.value) {
      handleError(new Error('Test not initialized'), {
        context: 'Next Question',
        showMessage: true,
        message: '测试未初始化，请刷新页面重试'
      })
      return
    }
    if (canGoNext.value) {
      currentQuestionIndex.value++
    }
  }

  function previousQuestion() {
    if (!isInitialized.value) {
      handleError(new Error('Test not initialized'), {
        context: 'Previous Question',
        showMessage: true,
        message: '测试未初始化，请刷新页面重试'
      })
      return
    }
    if (canGoPrevious.value) {
      currentQuestionIndex.value--
    }
  }

  function calculateResult() {
    if (!isInitialized.value) {
      handleError(new Error('Test not initialized'), {
        context: 'Calculate Result',
        showMessage: true,
        message: '测试未初始化，请刷新页面重试'
      })
      return null
    }
    
    // 初始化计数器
    let eiScore = 0
    let snScore = 0
    let tfScore = 0
    let jpScore = 0
    
    let eiTotal = 0
    let snTotal = 0
    let tfTotal = 0
    let jpTotal = 0

    // 计算每个维度的得分
    answers.value.forEach(answer => {
      const question = testQuestions.value.find(q => q.id === answer.questionId)
      if (!question) return

      // 根据问题的方向调整分数
      const score = question.direction === 'positive' ? answer.value : (6 - answer.value)
      
      switch (question.dimension) {
        case 'EI':
          eiScore += score
          eiTotal += 5 // 每个问题最高5分
          break
        case 'SN':
          snScore += score
          snTotal += 5
          break
        case 'TF':
          tfScore += score
          tfTotal += 5
          break
        case 'JP':
          jpScore += score
          jpTotal += 5
          break
      }
    })

    // 计算百分比
    const eiPercentage = Math.round((eiScore / eiTotal) * 100)
    const snPercentage = Math.round((snScore / snTotal) * 100)
    const tfPercentage = Math.round((tfScore / tfTotal) * 100)
    const jpPercentage = Math.round((jpScore / jpTotal) * 100)

    // 确定类型
    const type = `${eiPercentage > 50 ? 'E' : 'I'}${snPercentage > 50 ? 'S' : 'N'}${tfPercentage > 50 ? 'T' : 'F'}${jpPercentage > 50 ? 'J' : 'P'}`

    // 设置结果
    result.value = {
      type,
      ei: eiPercentage,
      sn: snPercentage,
      tf: tfPercentage,
      jp: jpPercentage
    }

    isTestCompleted.value = true
    return result.value
  }

  function resetTest() {
    if (!isInitialized.value) {
      handleError(new Error('Test not initialized'), {
        context: 'Reset Test',
        showMessage: true,
        message: '测试未初始化，请刷新页面重试'
      })
      return
    }
    currentQuestionIndex.value = 0
    answers.value = []
    result.value = null
    isTestCompleted.value = false
  }

  return {
    // 状态
    currentQuestionIndex,
    answers,
    result,
    isTestCompleted,
    isInitialized,
    
    // 计算属性
    currentQuestion,
    progress,
    canGoNext,
    canGoPrevious,
    getCurrentAnswer,
    
    // 方法
    initializeTest,
    setAnswer,
    nextQuestion,
    previousQuestion,
    calculateResult,
    resetTest
  }
})