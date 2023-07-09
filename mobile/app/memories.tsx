import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import Logo from '../src/assets/logo.svg'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'

import { api } from '../src/lib/api'

interface Memory {
  coverUrl: string
  createdAt: string
  excerpt: string
  id: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()
  const [memories, setMemories] = useState<Memory[]>([])

  async function handleSignOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const memories = response.data

    if (memories.lenght === 0) return

    setMemories(memories)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between px-8 before:mt-4">
        <Logo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleSignOut}
            className="rounder full h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="rounder full h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map(({ coverUrl, createdAt, excerpt, id }) => {
          return (
            <View className="space-y-4" key={id}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-6 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(createdAt).format('MMMM DD[, ]YYYY')}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{
                    uri: coverUrl,
                  }}
                  className="aspect-video w-full rounded-lg"
                  alt=""
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {excerpt}
                </Text>
                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Read more
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
