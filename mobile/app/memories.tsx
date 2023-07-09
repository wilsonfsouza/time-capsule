import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import Logo from '../src/assets/logo.svg'
import * as SecureStore from 'expo-secure-store'

import { api } from '../src/lib/api'

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  async function handleSignOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }
  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
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
    </ScrollView>
  )
}
